@echo off
REM Double-click to launch Icy's Second Brain locally (Windows).
REM Opens the browser and starts the local server from this folder.
start "" http://localhost:4321
node "%~dp0serve.js"
