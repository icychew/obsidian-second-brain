@echo off
REM Double-click to open Icy's Second Brain locally (Windows).
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js is not installed or not on your PATH.
  echo   Install it from https://nodejs.org  then double-click this file again.
  echo.
  pause
  exit /b
)
echo   Opening your Second Brain...
start "" http://localhost:4321
node "%~dp0serve.js"
echo.
echo   Server stopped. Close this window.
pause
