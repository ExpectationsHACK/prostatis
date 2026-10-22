# Speaks every line in a lines.json ([{ file, vo }]) with a Windows voice into the output folder.
# Usage (Windows PowerShell 5.1): .\voice-lines.ps1 -Lines sales\lines.json -Out sales\vo [-Voice "Microsoft George"]
param([Parameter(Mandatory)][string]$Lines, [Parameter(Mandatory)][string]$Out, [string]$Voice = "Microsoft George", [string]$Rate = "+6%")
New-Item -ItemType Directory -Force $Out | Out-Null
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Media.SpeechSynthesis.SpeechSynthesizer,Windows.Media.SpeechSynthesis,ContentType=WindowsRuntime]
$null = [Windows.Storage.Streams.DataReader,Windows.Storage.Streams,ContentType=WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$t) { $task = $asTask.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
$s = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
$s.Voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -eq $Voice }
$count = 0
foreach ($l in (Get-Content $Lines -Raw -Encoding UTF8 | ConvertFrom-Json)) {
  $text = [System.Security.SecurityElement]::Escape($l.vo)
  $ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-GB'><prosody rate='$Rate' pitch='-2%'>$text</prosody></speak>"
  $stream = Await ($s.SynthesizeSsmlToStreamAsync($ssml)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
  $reader = New-Object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
  $n = [uint32]$stream.Size; $null = Await ($reader.LoadAsync($n)) ([uint32])
  $bytes = New-Object byte[] $n; $reader.ReadBytes($bytes)
  [IO.File]::WriteAllBytes((Join-Path $Out $l.file), $bytes); $count++
}
"$count lines spoken into $Out"
