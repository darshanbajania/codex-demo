#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../backend"

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

if [[ "${SEED_PRODUCTS:-1}" == "1" ]]; then
  python manage.py shell -c "from django.test import Client; c=Client(); c.post('/api/seed/')"
fi

python manage.py runserver 127.0.0.1:8000
