@echo off
echo   API:   http://localhost:5000
echo   Blog:  http://localhost:5179
echo   Admin: http://localhost:5180

wt -w 0 new-tab --title "API" -d "%~dp0apps\api" cmd /k "npm run dev" ; ^
   new-tab --title "Blog" -d "%~dp0apps\blog" cmd /k "npm run dev -- --port 5179 --strictPort" ; ^
   new-tab --title "Admin" -d "%~dp0apps\admin" cmd /k "npm run dev -- --port 5180 --strictPort"
