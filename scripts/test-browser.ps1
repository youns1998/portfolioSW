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

# Inject fixtures before the data script runs. No example results are written to production data.
function Use-ProjectFixture($Scenario) {
    $source = 'const fixtureScenario = ' + (ConvertTo-Json $Scenario -Compress) + ';' + @'
Object.defineProperty(window, "portfolioSettings", { configurable: true, get() { return { projectLinks: true }; }, set(value) {} });
let fixtureProjects;
Object.defineProperty(window, "portfolioFeaturedProjects", {
  configurable: true,
  get() { return fixtureProjects; },
  set(projects) {
    fixtureProjects = projects;
    projects.forEach((project, index) => {
      project.status = index === 0 ? "completed" : "in-progress";
      if (fixtureScenario === "empty") {
        project.description = ""; project.scope = ""; project.tools = ["", " "];
        project.features = ["", " "]; project.architecture = "";
        project.screenshots = [null, {}, { file: "" }]; project.verification = [];
        project.repositoryUrl = ""; project.demoUrl = "";
        if (index === 0) { delete project.screenshots; delete project.features; }
      } else {
        project.description = "브라우저 검증용 임시 설명";
        project.features = ["검증용 기능 A", "검증용 기능 B"];
        project.architecture = "검증용 구성 설명";
        project.screenshots = [{ file: "images/projects/cad-productivity.svg", alt: "검증용 기존 자산", caption: "검증용 임시 화면" }];
        project.verification = ["검증용 테스트 결과 A", "검증용 테스트 결과 B"];
        project.demoUrl = "https://example.invalid/portfolio-test";
        if (fixtureScenario === "planned-results") project.status = "planned";
      }
    });
  }
});
'@
    return (Send-Cdp 'Page.addScriptToEvaluateOnNewDocument' @{ source = $source }).identifier
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


    foreach ($width in @(1440,1280,900,700,600,390,320)) {
        Set-Viewport $width
        Open-Page 'index.html'
        Assert-Js "Homepage contains projects without resume content at $width px" 'document.querySelector("h1").textContent==="프로젝트" && !document.querySelector(".intro,#about,#contact,.profile-facts,a[href^=\"mailto:\"],a[href*=\"#about\"],a[href*=\"#contact\"]") && !document.querySelector("main").textContent.match(/학력|자격|정보처리기사|소프트웨어학과|인턴|지원자|소프트웨어를 전공/)'
        Assert-Js "Three projects remain accessible at $width px" '[...document.querySelectorAll(".project-entry")].map(c=>c.dataset.project).join(",")==="cad-productivity-palette,it-support-desk,pc-troubleshooting-lab" && [...document.querySelectorAll(".project-entry")].every(c=>c.querySelector("h2").textContent&&c.querySelector("p").textContent)'
        Assert-Js "Homepage removes ornamental content at $width px" '!document.querySelector(".case-preview,.project-type,.project-filters,.profile-panel,.focus-strip,.approach-list,.skills-overview,.unfinished-note") && !document.querySelector("main img")'
        Assert-Js "Each project has a single working detail link at $width px" '[...document.querySelectorAll(".project-entry")].every(c=>c.querySelectorAll("a").length===1&&new URL(c.querySelector("a").href).searchParams.get("project")===c.dataset.project)'
        Assert-Js "Project external links stay disabled at $width px" '!document.querySelector(".project-entry a[target=\"_blank\"]") && window.portfolioSettings.projectLinks===false'
        Assert-Js "Home assets and layout at $width px" '[...document.images].every(i=>i.complete&&i.naturalWidth>0) && document.documentElement.scrollWidth<=innerWidth'
        Assert-Js "Header scroll offset at $width px" 'Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))-document.querySelector("header").getBoundingClientRect().height)<1'
        Assert-Js "Finished presentation has no planning disclosure at $width px" '!document.querySelector(".learning-projects") && !document.querySelector("#work").textContent.match(/미완성|미구현|구현 예정|자료 보완/) && window.portfolioFeaturedProjects.length===2'
        Assert-Js "External links open safely at $width px" '[...document.querySelectorAll("a[href^=\"https://\"]")].every(a=>a.target==="_blank"&&a.rel.includes("noopener")&&a.rel.includes("noreferrer"))'
    }
    Set-Viewport 1440
    Open-Page 'index.html'
    Assert-Js 'Project navigation reaches the list' 'document.querySelector("nav a[href=\"#work\"]").click();new Promise(r=>setTimeout(()=>r(location.hash==="#work"&&document.querySelector("#work").getBoundingClientRect().top<innerHeight),150))'
    foreach ($width in @(1440,390,320)) {
        Set-Viewport $width
        foreach ($project in @('cad-productivity-palette','it-support-desk','pc-troubleshooting-lab')) {
            Open-Page ('projects/detail.html?project=' + $project)
            Assert-Js "Concise detail preserves context and features at $width px for $project" '!!document.querySelector(".case-heading h1") && document.querySelectorAll(".case-overview p").length===2 && document.querySelectorAll(".case-feature-list li").length===3 && !document.querySelector(".case-preview,.case-workflow,.case-feature-grid,.case-facts,.completion-notice,.todo-marker,.evidence-slot")'
            Assert-Js "Case detail fits viewport at $width px for $project" 'document.documentElement.scrollWidth<=innerWidth'
            Assert-Js "Project detail retains finished copy without external actions at $width px for $project" '!document.querySelector(".case-detail .case-actions a") && !document.querySelector("#project-detail").textContent.match(/미완성|미구현|구현 예정|자료 보완/) && /구현했습니다|정리했습니다|문서화했습니다|객체/.test(document.querySelector(".case-feature-list").textContent)'
            if ($width -eq 1440 -and $project -eq 'it-support-desk') {
                $shot = Send-Cdp 'Page.captureScreenshot' @{ format = 'png'; captureBeyondViewport = $true }
                [IO.File]::WriteAllBytes((Join-Path $root '.codex-preview/detail-1440.png'), [Convert]::FromBase64String($shot.data))
            }
        }
        foreach ($project in @('spring-backend','gis-spatial','revit-bim-inspector','drawing-file-organizer','comic-cafe','two-story-house')) {
            Open-Page ('projects/detail.html?project=' + $project)
            Assert-Js "Existing detail is preserved at $width px for $project" '!!document.querySelector("h1") && !document.querySelector(".empty-message") && document.documentElement.scrollWidth<=innerWidth'
        }
        Open-Page 'projects/detail.html?project=invalid'
        Assert-Js "Unknown project offers a return at $width px" 'document.querySelector("#project-detail h1").textContent.includes("찾을 수 없습니다") && !!document.querySelector("#project-detail a[href=\"../index.html#work\"]")'
        Open-Page 'index.html'
        $shot = Send-Cdp 'Page.captureScreenshot' @{ format = 'png'; captureBeyondViewport = $true }
        [IO.File]::WriteAllBytes((Join-Path $root ('.codex-preview/home-' + $width + '.png')), [Convert]::FromBase64String($shot.data))
    }
    # Verify future real results can replace empty fields without being shown for planned projects.
    foreach ($scenario in @('results','empty','planned-results')) {
        $fixture = Use-ProjectFixture $scenario
        try {
            Set-Viewport 320
            foreach ($project in @('spring-backend','gis-spatial')) {
                Open-Page ('projects/detail.html?project=' + $project)
                Assert-Js "Fixture $scenario detail fits for $project" '!!document.querySelector("h1") && document.documentElement.scrollWidth<=innerWidth'
                if ($scenario -eq 'results') {
                    Assert-Js "Real-result fields render for $project" 'document.querySelectorAll(".project-content").length===4 && document.querySelector(".project-screenshot img").naturalWidth>0 && !!document.querySelector(".featured-demo")'
                    Assert-Js "Broken screenshot removes its empty section for $project" 'document.querySelector(".project-screenshot img").dispatchEvent(new Event("error"));!document.querySelector(".project-content--screenshots")'
                } else {
                    Assert-Js "Unimplemented or absent results stay hidden for $project" '!document.querySelector(".project-content, .featured-footer, #project-detail img")'
                }
            }
        } finally {
            $null = Send-Cdp 'Page.removeScriptToEvaluateOnNewDocument' @{ identifier = $fixture }
        }
    }
    if ($script:browserErrors.Count) { $script:failures.Add(($script:browserErrors -join '; ')) }
    if ($script:failures.Count) { throw "$($script:failures.Count) browser checks failed: $($script:failures -join '; ')" }
    Write-Host "Passed $($script:checks) browser checks with no browser errors."
} finally {
    $socket.Dispose()
    if ($browser -and -not $browser.HasExited) { Stop-Process -Id $browser.Id -ErrorAction SilentlyContinue }
}
