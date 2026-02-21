# Winter Luxe Full Stack Apps

Yes — you can run this project **without Docker**.

This repository contains:
- `backend/`: Django + DRF API for products, auth, cart, checkout, orders, invoices, and admin metrics.
- `frontend/`: React + Vite premium winter ecommerce frontend.

## 1) Run locally without Docker (recommended for development)

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### Backend (Terminal 1)
```bash
cd backend
cp .env.example .env  # optional, edit values if needed
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

Seed sample products (run once in another terminal):
```bash
curl -X POST http://127.0.0.1:8000/api/seed/
```

### Frontend (Terminal 2)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open: http://127.0.0.1:5173

---

## 2) Quick local start helpers (without Docker)

From repo root:
```bash
./scripts/run_backend.sh
```
In another terminal:
```bash
./scripts/run_frontend.sh
```

Notes:
- `run_backend.sh` creates venv, installs requirements, migrates, optionally seeds products, then starts Django.
- Disable auto-seed by running: `SEED_PRODUCTS=0 ./scripts/run_backend.sh`

---

## 3) Run with Docker (optional)

```bash
docker compose up --build
```

---

## Environment variables

### Backend (`backend/.env.example`)
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOW_ALL_ORIGINS`

### Frontend (`frontend/.env.example`)
- `VITE_API_BASE_URL` (defaults to `http://127.0.0.1:8000/api/`)

## Deployment readiness
- Backend has standard Django app layout and WSGI/ASGI entrypoints.
- Frontend builds static assets via `npm run build`.
- Both apps can be deployed independently to cloud services.
