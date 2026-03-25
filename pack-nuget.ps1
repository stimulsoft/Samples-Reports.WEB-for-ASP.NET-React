$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$dllDir = Join-Path $scriptDir "..\Stimulsoft.Reports\Stimulsoft.Report.React\bin\Debug\net6.0"
$nuspecPath = Join-Path $scriptDir "Stimulsoft.Reports.React.NetCore.nuspec"
$outputDir = Join-Path $scriptDir "local-packages"
$packageName = "Stimulsoft.Reports.React.NetCore.2026.1.6.nupkg"
$outputPath = Join-Path $outputDir $packageName

# Verify source files exist
if (-not (Test-Path $dllDir)) {
    Write-Error "DLL directory not found: $dllDir"
    exit 1
}
if (-not (Test-Path $nuspecPath)) {
    Write-Error "Nuspec not found: $nuspecPath"
    exit 1
}

# Create output dir
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Remove old package
if (Test-Path $outputPath) {
    Remove-Item $outputPath -Force
}

# Create temp staging directory
$tempDir = Join-Path $env:TEMP "stimulsoft-react-nupkg"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy nuspec
Copy-Item $nuspecPath (Join-Path $tempDir "Stimulsoft.Reports.React.NetCore.nuspec")

# Create lib/net6.0 and copy DLLs
$libDir = Join-Path $tempDir "lib\net6.0"
New-Item -ItemType Directory -Path $libDir | Out-Null

$dlls = @(
    "Stimulsoft.Base.dll",
    "Stimulsoft.Blockly.dll",
    "Stimulsoft.Data.dll",
    "Stimulsoft.Drawing.dll",
    "Stimulsoft.Map.dll",
    "Stimulsoft.Report.dll",
    "Stimulsoft.Report.Check.dll",
    "Stimulsoft.Report.Helper.dll",
    "Stimulsoft.Report.Mvc.NetCore.dll",
    "Stimulsoft.Report.React.dll",
    "Stimulsoft.Report.Web.dll",
    "Stimulsoft.Report.WebDesign.dll",
    "Stimulsoft.System.dll",
    "Stimulsoft.System.Web.dll"
)

foreach ($dll in $dlls) {
    $src = Join-Path $dllDir $dll
    if (-not (Test-Path $src)) {
        Write-Error "Missing DLL: $src"
        exit 1
    }
    Copy-Item $src $libDir
    Write-Host "  Added: $dll"
}

# Create [Content_Types].xml
@'
<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="nuspec" ContentType="application/octet" />
  <Default Extension="dll" ContentType="application/octet" />
</Types>
'@ | Set-Content -LiteralPath (Join-Path $tempDir "[Content_Types].xml")

# Create _rels/.rels
$relsDir = Join-Path $tempDir "_rels"
New-Item -ItemType Directory -Path $relsDir | Out-Null
@'
<?xml version="1.0" encoding="utf-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Type="http://schemas.microsoft.com/packaging/2010/07/manifest" Target="/Stimulsoft.Reports.React.NetCore.nuspec" Id="R1" />
</Relationships>
'@ | Set-Content -LiteralPath (Join-Path $relsDir ".rels")

# Create ZIP (nupkg)
Write-Host ""
Write-Host "Creating NuGet package..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $outputPath)

# Cleanup
Remove-Item $tempDir -Recurse -Force

# Verify
$size = (Get-Item $outputPath).Length
Write-Host ""
Write-Host "Done! Package created: $outputPath"
Write-Host "Size: $([math]::Round($size / 1024)) KB ($($dlls.Count) DLLs + dependencies declared)"
Write-Host ""
Write-Host "Now you can build the sample projects in Visual Studio."
