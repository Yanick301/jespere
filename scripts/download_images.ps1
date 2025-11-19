# Downloads representative images for products using Unsplash Source
# Usage: From project root (PowerShell):
#   powershell -ExecutionPolicy Bypass -File .\scripts\download_images.ps1 -Limit 30

param(
  [int]$Limit = 0
)

$prodFile = Join-Path $PSScriptRoot "..\lib\products.ts"
if (-not (Test-Path $prodFile)) {
  Write-Error "products.ts not found at $prodFile"
  exit 1
}

$content = Get-Content $prodFile -Raw
$pattern = "\{\s*id:\s*(\d+)[\s\S]*?name:\s*'([^']*)'[\s\S]*?category:\s*'([^']*)'[\s\S]*?subcategory:\s*'([^']*)'"
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

$destDir = Join-Path $PSScriptRoot "..\public\images"
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

$images = @{}
$count = 0
foreach ($m in $matches) {
  if ($Limit -gt 0 -and $count -ge $Limit) { break }
  $id = $m.Groups[1].Value
  $name = ($m.Groups[2].Value -replace "[^a-zA-Z0-9\s]", "") -replace '\\s+', ' '
  $cat = ($m.Groups[3].Value -replace "[^a-zA-Z0-9\s]", "") -replace '\\s+', ' '
  $sub = ($m.Groups[4].Value -replace "[^a-zA-Z0-9\s]", "") -replace '\\s+', ' '

  $tokens = "$cat,$sub,$name"
  $query = [System.Uri]::EscapeDataString($tokens)
  $url = "https://source.unsplash.com/1280x1280/?$query&sig=$id"
  $out = Join-Path $destDir "$id.jpg"

  Write-Output "Downloading image for id $id -> $out"
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    $images[$id.ToString()] = "/images/$id.jpg"
    $count++
  } catch {
    Write-Warning "Failed to download image for $id : $_"
  }
}

# Write mapping JSON
$mapFile = Join-Path $PSScriptRoot "..\lib\product-images.json"
try {
  $json = $images | ConvertTo-Json -Depth 5
  $json | Out-File -FilePath $mapFile -Encoding UTF8
  Write-Output "Saved mapping to $mapFile"
} catch {
  Write-Warning "Failed to write mapping JSON: $_"
}

Write-Output "Done. Downloaded $count images."
