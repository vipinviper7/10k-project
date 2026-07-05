# Bites — Food Photo Journal

A dead-simple food journal: snap a photo of whatever you eat or drink, and it lands in a
day-by-day timeline. No calories, no portions, no measuring — just pictures.

**Live app:** https://vipinviper7.github.io/10k-project/

## Features

- **One-tap capture** — the floating Snap button opens the phone camera directly
  (falls back to a file picker on desktop).
- **Day-grouped timeline** — photos are organized under Today / Yesterday / date headings
  with the time each one was taken.
- **Meal tags** — each photo gets an automatic Breakfast / Lunch / Snack / Dinner / Drink
  tag based on the time of day; tap a photo to change it.
- **Optional notes** — jot a line about the meal if you feel like it.
- **Private by design** — photos are compressed and stored on-device in IndexedDB.
  Nothing is uploaded anywhere. You can download any photo back out.
- **Dark mode**, entrance animations, and a mobile-first layout. Ships with Capacitor
  config for Android/iOS packaging.

## Running locally

```bash
cd frontend
yarn install
yarn start        # http://localhost:3000
```

The `backend/` folder contains only a FastAPI health-check stub — the app is fully
client-side and needs no database or API.

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload   # GET /api/health
```

## Deploying

The app is hosted on GitHub Pages from the `gh-pages` branch. To publish a new build:

```bash
cd frontend
yarn build
# copy the contents of frontend/build/ onto the gh-pages branch and push
```

## Regenerating app icons

```bash
cd frontend
node scripts/generate-icons.js
```

## Tech

React 19 (CRA + craco), Tailwind + shadcn/ui, framer-motion, lucide-react, sonner,
IndexedDB for photo storage, Capacitor for native builds.
