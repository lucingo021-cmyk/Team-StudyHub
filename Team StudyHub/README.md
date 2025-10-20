# Team StudyHub

Full-stack sample project: Vite + React frontend and Node.js + Express backend with Prisma (SQLite).

Quick start (Windows PowerShell):

1) Install dependencies

   # from repository root
   npm install
   cd backend; npm install; cd ..

2) Generate Prisma client and push schema:

   cd backend
   npx prisma generate
   npx prisma db push --accept-data-loss
   node prisma/seed.js

3) Start both servers (from repo root):

   .\start.bat    # or on Unix: ./start.sh

Health check:

   GET http://localhost:5000/api/health

Frontend dev: http://localhost:3000
Backend API: http://localhost:5000/api
