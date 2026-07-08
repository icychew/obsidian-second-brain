@echo off
REM Double-click to open Icy's Second Brain locally using Python.
cd /d "%~dp0"
echo   Opening your Second Brain (Python)...
start "" http://localhost:4321
py "%~dp0serve.py" 2>nul
if errorlevel 1 python "%~dp0serve.py"
echo.
echo   Server stopped. If it did not start, install Python (python.org) or use start-brain.bat (Node).
pause
