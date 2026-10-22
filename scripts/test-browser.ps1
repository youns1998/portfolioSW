param([string]$BrowserPath, [string]$BaseUrl)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
if ($BaseUrl) { $BaseUrl = $BaseUrl.TrimEnd('/') + '/' }
if (-not $BrowserPath) {
    $BrowserPath = @(
        "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    ) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
}
if (-not $BrowserPath) { throw 'Install Chrome or Edge, or supply -BrowserPath.' }
$profile = Join-Path $root ('.codex-preview/browser-' + [guid]::NewGuid().ToString('N'))
$socket = [Net.WebSockets.ClientWebSocket]::new()
$script:commandId = 0
$script:failures = [Collections.Generic.List[string]]::new()
$script:browserErrors = [Collections.Generic.List[string]]::new()
$script:checks = 0

function Send-Cdp($Method, $Parameters = @{}) {
    $script:commandId++
    $id = $script:commandId
    $json = @{ id = $id; method = $Method; params = $Parameters } | ConvertTo-Json -Depth 20 -Compress
    $bytes = [Text.Encoding]::UTF8.GetBytes($json)
    $null = $socket.SendAsync([ArraySegment[byte]]::new($bytes), [Net.WebSockets.WebSocketMessageType]::Text, $true, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
    while ($true) {
        $stream = [IO.MemoryStream]::new()
        $cancel = [Threading.CancellationTokenSource]::new(20000)
        try {
            do {
                $buffer = New-Object byte[] 65536
                $message = $socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $cancel.Token).GetAwaiter().GetResult()
                if ($message.MessageType -eq [Net.WebSockets.WebSocketMessageType]::Close) { throw 'Browser disconnected.' }
                $stream.Write($buffer, 0, $message.Count)
            } while (-not $message.EndOfMessage)
            $payload = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
        } finally { $stream.Dispose(); $cancel.Dispose() }
        if ($payload.method -eq 'Runtime.exceptionThrown') { $script:browserErrors.Add(($payload.params | ConvertTo-Json -Depth 8 -Compress)) }
        if ($payload.method -eq 'Log.entryAdded' -and $payload.params.entry.level -eq 'error') { $script:browserErrors.Add($payload.params.entry.text) }
        if ($payload.id -eq $id) {
            if ($payload.error) { throw ($payload.error | ConvertTo-Json -Compress) }
            return $payload.result
        }
    }
}

function Invoke-Js($Expression) {
    $result = Send-Cdp 'Runtime.evaluate' @{ expression = $Expression; returnByValue = $true; awaitPromise = $true }
    if ($result.exceptionDetails) { throw ($result.exceptionDetails | ConvertTo-Json -Depth 8) }
    return $result.result.value
}

function Open-Page($Path) {
    if ($BaseUrl) {
        $url = [uri]::new([uri]$BaseUrl, $Path).AbsoluteUri
    } else {
        $parts = $Path -split '\?', 2
        $url = ([uri](Join-Path $root ('docs/' + $parts[0]))).AbsoluteUri
        if ($parts.Count -gt 1) { $url += '?' + $parts[1] }
    }
    $navigation = Send-Cdp 'Page.navigate' @{ url = $url }
    if ($navigation.errorText) { throw $navigation.errorText }
    # Wait until the new document has replaced the previous execution context.
    for ($attempt = 0; $attempt -lt 100; $attempt++) {
        Start-Sleep -Milliseconds 100
        try {
            if (Invoke-Js ('location.href === ' + (ConvertTo-Json $url -Compress) + ' && document.readyState === "complete"')) { break }
        } catch { if ($attempt -eq 99) { throw } }
    }
    if ($attempt -eq 100) { throw "Page did not finish loading: $Path" }
    $null = Invoke-Js 'Promise.all([...document.images].map(i => { i.loading = "eager"; return i.decode().catch(() => {}); })).then(() => document.fonts.ready).then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))'
}

function Assert-Js($Name, $Expression) {
    $script:checks++
    if ((Invoke-Js $Expression) -ne $true) { $script:failures.Add($Name); Write-Host "FAIL $Name" }
}

function Set-Viewport($Width) {
    $null = Send-Cdp 'Emulation.setDeviceMetricsOverride' @{ width = $Width; height = 900; deviceScaleFactor = 1; mobile = $false }
}

try {
    $browser = Start-Process $BrowserPath -ArgumentList @('--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', ('--user-data-dir="' + $profile + '"'), 'about:blank') -WindowStyle Hidden -PassThru
    $portFile = Join-Path $profile 'DevToolsActivePort'
    for ($attempt = 0; $attempt -lt 100 -and -not (Test-Path -LiteralPath $portFile); $attempt++) { Start-Sleep -Milliseconds 100 }
    if (-not (Test-Path -LiteralPath $portFile)) { throw 'Browser debugging endpoint did not start.' }
    $port = (Get-Content -LiteralPath $portFile)[0]
    $tabs = Invoke-RestMethod "http://127.0.0.1:$port/json/list"
    $tab = $tabs | Where-Object type -eq 'page' | Select-Object -First 1
    $null = $socket.ConnectAsync([uri]$tab.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
    $null = Send-Cdp 'Runtime.enable'
    $null = Send-Cdp 'Log.enable'
    $null = Send-Cdp 'Page.enable'
    $null = Send-Cdp 'Emulation.setEmulatedMedia' @{ features = @(@{ name = 'prefers-reduced-motion'; value = 'no-preference' }) }

    foreach ($width in @(1440,1280,1101,900,600,390,320)) {
        Set-Viewport $width
        Open-Page 'index.html'
        Assert-Js "Software identity and primary collection at $width px" 'document.body.dataset.focus==="software" && document.title.includes("Software") && !!document.querySelector(".project-collection:first-child #github-project-list")'
        Assert-Js "Three implemented projects and two reserved slots at $width px" 'document.querySelectorAll("#github-project-list .project-card").length===3 && document.querySelectorAll(".planned-project").length===2 && document.querySelectorAll(".project-card").length===5 && !document.querySelector(".planned-project a, .planned-project button")'
        Assert-Js "Reserved work is explicitly unimplemented at $width px" '[...document.querySelectorAll(".planned-project")].every(p=>p.textContent.includes("기획 전")&&p.textContent.includes("준비 중")) && window.portfolioPlannedProjects.map(p=>p.id).join(",")==="spring-backend,gis-spatial"'
        Assert-Js "Architecture remains a compact external reference at $width px" 'document.querySelectorAll("#drawing-project-list .project-card--supporting").length===2 && !document.querySelector("#drawing-project-list .project-card-visual") && [...document.querySelectorAll("#drawing-project-list a")].every(a=>a.hostname==="youns1998.github.io"&&a.pathname.includes("/portfolioCAD/"))'
        Assert-Js "Code cards link to verified source and show implementation limits at $width px" '[...document.querySelectorAll("#github-project-list .project-card")].every(card=>{const p=window.portfolioProjects.find(p=>p.id===card.dataset.project),a=card.querySelector(".repository-link");return a.href===p.readmeUrl&&a.target==="_blank"&&a.rel.includes("noopener")&&card.querySelectorAll(".project-highlights li").length===3&&card.querySelector(".project-verification").textContent===p.verification;})'
        Assert-Js "Home assets load at $width px" '[...document.images].every(i=>i.complete&&i.naturalWidth>0)'
        Assert-Js "Home fits viewport at $width px" 'document.documentElement.scrollWidth<=innerWidth'
        Assert-Js "Header scroll offset at $width px" 'Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))-document.querySelector("header").getBoundingClientRect().height)<1'
        Assert-Js "Focused technical skills do not claim Spring results at $width px" 'document.querySelectorAll(".tech-group").length===1 && !document.querySelector(".tech-tags").textContent.includes("Spring") && document.querySelectorAll(".tech-tags li").length===4'
        Assert-Js "Shared visual design applies at $width px" 'getComputedStyle(document.body).backgroundColor==="rgb(245, 247, 243)" && getComputedStyle(document.querySelector("#github-project-list")).display==="grid" && getComputedStyle(document.querySelector("#github-project-list .project-card")).borderRadius==="12px"'
    }
    Set-Viewport 1440
    Open-Page 'index.html'
    Assert-Js 'Project navigation and active state work' 'document.querySelector("nav a[href=\"#work\"]").click();new Promise(r=>setTimeout(()=>r(location.hash==="#work" && document.querySelector("nav a[aria-current=\"location\"]").hash==="#work"),150))'
    Assert-Js 'Contact navigation works' 'document.querySelector("nav a[href=\"#contact\"]").click();new Promise(r=>setTimeout(()=>r(document.querySelector("nav a[aria-current=\"location\"]").hash==="#contact"),150))'
    Assert-Js 'Counterpart points to the architecture portfolio' 'document.querySelector(".counterpart-section a").href==="https://youns1998.github.io/portfolioCAD/"'
    $null = Send-Cdp 'Emulation.setEmulatedMedia' @{ features = @(@{name='prefers-reduced-motion';value='reduce'}) }
    Assert-Js 'Reduced motion disables pointer effects' '(()=>{const e=document.querySelector("#github-project-list .project-card");e.dispatchEvent(new PointerEvent("pointermove",{pointerType:"mouse",bubbles:true,clientX:100,clientY:100}));return new Promise(r=>requestAnimationFrame(()=>r(!e.classList.contains("is-pointer-active"))));})()'
    foreach ($width in @(1440,390)) {
        Set-Viewport $width
        foreach ($project in @('cad-productivity-palette','revit-bim-inspector','drawing-file-organizer')) {
            Open-Page ('projects/detail.html?project=' + $project)
            Assert-Js "Development detail at $width px for $project" 'document.querySelector("h1").textContent===window.portfolioProjects.find(p=>p.id===new URLSearchParams(location.search).get("project")).title && document.querySelectorAll(".development-detail li").length===3 && !!document.querySelector(".detail-heading a[href^=\"https://github.com/\"]")'
            Assert-Js "Detail fits viewport at $width px for $project" 'document.documentElement.scrollWidth<=innerWidth'
        }
        Open-Page 'projects/detail.html?project=invalid'
        Assert-Js "Unknown project offers a return at $width px" '!!document.querySelector("#project-detail h1") && !!document.querySelector("#project-detail a[href=\"../index.html#work\"]")'
        Open-Page 'projects/detail.html?project=comic-cafe'
        Assert-Js "Architecture reference detail offers original documents at $width px" 'document.querySelector(".detail-heading a").href.includes("/portfolioCAD/projects/detail.html?project=comic-cafe") && !document.querySelector("iframe")'
        Open-Page 'index.html'
        $shot = Send-Cdp 'Page.captureScreenshot' @{ format = 'png'; captureBeyondViewport = $true }
        [IO.File]::WriteAllBytes((Join-Path $root ('.codex-preview/home-' + $width + '.png')), [Convert]::FromBase64String($shot.data))
        $null = Invoke-Js 'document.querySelector("#work").scrollIntoView();new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'
        $shot = Send-Cdp 'Page.captureScreenshot' @{ format = 'png' }
        [IO.File]::WriteAllBytes((Join-Path $root ('.codex-preview/work-' + $width + '.png')), [Convert]::FromBase64String($shot.data))
    }
    if ($script:browserErrors.Count) { $script:failures.Add(($script:browserErrors -join '; ')) }
    if ($script:failures.Count) { throw "$($script:failures.Count) browser checks failed: $($script:failures -join '; ')" }
    Write-Host "Passed $($script:checks) browser checks with no browser errors."
} finally {
    $socket.Dispose()
    if ($browser -and -not $browser.HasExited) { Stop-Process -Id $browser.Id -ErrorAction SilentlyContinue }
}
