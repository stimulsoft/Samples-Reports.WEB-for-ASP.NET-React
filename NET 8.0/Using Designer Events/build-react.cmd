cd ClientApp
call npm i
call npx react-scripts build
xcopy /E /Y build\* ..\wwwroot\
cd ..
