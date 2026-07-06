@echo off
REM Build icy_brain.exe from serve.js. Run this ONCE (needs Node.js installed).
REM After it finishes, double-click icy_brain.exe to open your Second Brain.
echo.
echo Building icy_brain.exe  (first run downloads the packager - please wait)...
echo.
call npx --yes pkg serve.js --targets node18-win-x64 --output icy_brain.exe
echo.
if exist icy_brain.exe (
  echo  Done!  Double-click  icy_brain.exe  to open your Second Brain.
) else (
  echo  Build did not produce the exe. Make sure Node.js is installed, then retry.
)
pause
