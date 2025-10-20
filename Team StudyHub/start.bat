@echo off
SET ROOT=%~dp0
IF NOT EXIST "%ROOT%.env.local" (
  echo VITE_API_URL=http://localhost:5000/api > "%ROOT%.env.local"
  echo Created .env.local
)
pushd "%~dp0\backend"
start cmd /k "npm run dev"
popd
start cmd /k "cd /d %~dp0 && npm run --prefix . start-frontend"
echo Servers started.
