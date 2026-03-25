cd ClientApp
set NODE_OPTIONS=--openssl-legacy-provider
call npm i --force
IF %ERRORLEVEL% NEQ 0 ( 
set NODE_OPTIONS=
call npm i --force
)

rem Fix symlink issue: copy viewer package physically to avoid dual React instances
rem Using robocopy instead of xcopy to handle long Windows paths (MAX_PATH 260 limit)
if exist node_modules\stimulsoft-viewer-react (
  rmdir /s /q node_modules\stimulsoft-viewer-react 2>nul
  del node_modules\stimulsoft-viewer-react 2>nul
)
robocopy "..\..\..\..\Stimulsoft.Reports\Stimulsoft.Report.React.Viewer\ClientApp\dist\stimulsoft-viewer-react" "node_modules\stimulsoft-viewer-react" /E /NFL /NDL /NJH /NJS /NC /NS /NP
rem robocopy exit codes 0-7 are success; 8+ means error
if %ERRORLEVEL% GEQ 8 exit /b 1

call npx react-scripts build
xcopy /E /Y build\* ..\wwwroot\
cd ..
