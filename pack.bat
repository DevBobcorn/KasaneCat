@echo off

set PluginName=KasaneCat
set Version=0.1.2

rem Call Bandizip to zip plugin files
bz c temp.zip main.js manifest.json
move temp.zip C:\betterncm\plugins\%PluginName%-%Version%.plugin

echo %PluginName% Version %Version% packed and moved to plugins folder

pause