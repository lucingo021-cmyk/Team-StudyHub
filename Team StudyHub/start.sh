#!/usr/bin/env bash
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ ! -f "$ROOT_DIR/.env.local" ]; then
  echo "VITE_API_URL=http://localhost:5000/api" > "$ROOT_DIR/.env.local"
  echo "Created .env.local"
fi
open_backend(){
  (cd "$ROOT_DIR/backend" && npm run dev)
}
open_frontend(){
  (cd "$ROOT_DIR" && npm run start-frontend)
}
open_backend &
open_frontend
