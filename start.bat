@echo off
echo Starting SAGAR Platform...
echo.

echo Starting Docker services...
docker-compose up -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak > nul

echo.
echo Starting web application...
cd apps\web
start cmd /k "npm run dev"

echo.
echo Starting backend API...
cd ..\backend
start cmd /k "npm run start:dev"

echo.
echo Starting NLP service...
cd ..\nlp-service
start cmd /k "python main.py"

echo.
echo SAGAR Platform is starting up!
echo.
echo Services will be available at:
echo - Web App: http://localhost:3000
echo - Backend API: http://localhost:3001
echo - NLP Service: http://localhost:8000
echo.
echo Press any key to exit...
pause > nul
