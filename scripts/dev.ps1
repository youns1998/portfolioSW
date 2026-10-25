param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('Spring','GIS','CAD')][string]$Project,
    [Parameter(Mandatory=$true)]
    [ValidateSet('run','test','build','engine')][string]$Action
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$configPath = Join-Path $root '.dev-tools.json'
$config = if (Test-Path -LiteralPath $configPath) {
    Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json
} else { [pscustomobject]@{} }

function Get-ToolSetting([string]$Name,[string]$Default) {
    $property = $config.PSObject.Properties[$Name]
    if ($property -and -not [string]::IsNullOrWhiteSpace($property.Value)) { return [string]$property.Value }
    return $Default
}

function Resolve-Tool([string]$Name) {
    $command = Get-Command $Name -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $command) { throw "Tool not found: $Name. Configure PATH or $configPath" }
    return $command.Source
}

function Invoke-Checked([string]$File,[string[]]$CommandArguments) {
    & $File @CommandArguments
    if ($LASTEXITCODE -ne 0) { throw "Command failed with exit code $LASTEXITCODE" }
}

$repositoryNames = @{ Spring='portfolioSPR'; GIS='portfolioGIS'; CAD='cad-productivity-palette' }
$repository = Join-Path (Split-Path $root) $repositoryNames[$Project]
if (-not (Test-Path -LiteralPath $repository -PathType Container)) { throw "Repository not found: $repository" }
if ($Action -eq 'engine' -and $Project -ne 'CAD') { throw 'Engine verification is available for CAD only.' }
if ($Project -eq 'CAD' -and $Action -eq 'run') { throw 'Build CAD, then use NETLOAD and CADTOOLS inside AutoCAD.' }

$previousPath = $env:Path
$previousJavaHome = $env:JAVA_HOME
$previousDotnetRoot = $env:DOTNET_ROOT
$previousDotnetRootX64 = $env:DOTNET_ROOT_X64
$previousPythonUtf8 = $env:PYTHONUTF8
Push-Location $repository
try {
    switch ($Project) {
        'Spring' {
            $javaHome = Get-ToolSetting 'javaHome' $env:JAVA_HOME
            if (-not $javaHome) { $javaHome = Split-Path (Split-Path (Resolve-Tool 'java')) }
            $java = Join-Path $javaHome 'bin/java.exe'
            if (-not (Test-Path -LiteralPath $java)) { throw "JDK not found: $java" }
            $env:JAVA_HOME = $javaHome
            $env:Path = (Join-Path $javaHome 'bin') + ';' + $env:Path
            $maven = Join-Path $repository 'mvnw.cmd'
            switch ($Action) {
                'run' { Invoke-Checked $maven @('spring-boot:run') }
                'test' { Invoke-Checked $maven @('-q','test','-Dlogging.level.root=WARN','-Ddebug=false') }
                'build' { Invoke-Checked $maven @('-q','package','-Dlogging.level.root=WARN','-Ddebug=false') }
            }
        }
        'GIS' {
            $python = Resolve-Tool (Get-ToolSetting 'python' 'python')
            $env:PYTHONUTF8 = '1'
            $output = '.codex-preview/dev-output'
            switch ($Action) {
                'test' { Invoke-Checked $python @('-m','unittest','discover','-s','tests','-v') }
                'build' { Invoke-Checked $python @('run.py','analyze','--output',$output) }
                'run' {
                    Invoke-Checked $python @('run.py','analyze','--output',$output)
                    Invoke-Checked $python @('run.py','serve','--output',$output)
                }
            }
        }
        'CAD' {
            $dotnet = Resolve-Tool (Get-ToolSetting 'dotnet' 'dotnet')
            $env:DOTNET_ROOT = Split-Path $dotnet
            $env:DOTNET_ROOT_X64 = $env:DOTNET_ROOT
            switch ($Action) {
                'test' { Invoke-Checked $dotnet @('run','--project','tools/ReviewRunner','--','--self-test') }
                'build' { Invoke-Checked $dotnet @('build','-c','Release') }
                'engine' {
                    & (Join-Path $repository 'scripts/verify-autocad.ps1') -Dotnet $dotnet
                }
            }
        }
    }
} finally {
    Pop-Location
    $env:Path = $previousPath
    $env:JAVA_HOME = $previousJavaHome
    $env:DOTNET_ROOT = $previousDotnetRoot
    $env:DOTNET_ROOT_X64 = $previousDotnetRootX64
    $env:PYTHONUTF8 = $previousPythonUtf8
}
