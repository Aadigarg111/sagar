@echo off
echo 🌊 Starting SAGAR Platform Demo...
echo ================================

cd apps\web
echo Installing dependencies...
call npm install

echo Starting development server...
echo.
echo ✅ SAGAR Platform is starting up!
echo 🌐 Frontend: http://localhost:3000
echo.
echo 📚 For more information, see README.md
echo 🚀 This is a frontend-only demo with mock data
echo.

call npm run dev