# Neuroscience Alliance @ UCF

Modern Next.js 16 (App Router) site with admin tools for managing leadership, events, and branding. Tailwind 4, TypeScript, and Framer Motion are used throughout. Admin functionality supports authenticated edits to runtime content and media uploads.

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind 4, Framer Motion, Lucide icons
- ESLint (Next core-web-vitals + TS)

## Project Structure
- `src/app` — Routes (pages/api, admin tools). Admin sections for leadership, events, branding. Middleware enforces auth.
- `src/components` — UI primitives, layout (Navbar/Footer), home sections, leadership grid, etc.
- `src/data` — Runtime content (`content.json`, ignored in Git) and examples (`content.example.json`, `server-config.example.json`).
- `public/uploads` — User-uploaded assets (ignored in Git).
- `src/lib` — Helpers (API client, content loader).

## Admin & Content
- Admin auth: cookie `admin_auth=1`, set via `/api/admin/login`; password comes from `ADMIN_PASSWORD` env.
- Admin sections:
  - Leadership: create/edit members with photo uploads.
  - Events: manage upcoming events.
  - Branding: upload/clear site logo (also used for favicon), preview header.
- Content persistence:
  - Runtime data lives in `src/data/content.json` (ignored in Git). If missing, defaults are used and created on first save.
  - Example schemas: `src/data/content.example.json`, `src/data/server-config.example.json`.
  - Uploads go to `public/uploads/` (ignored in Git). Replacing a photo deletes the previous local upload.

## API/Routes
- `/api/admin/login` — Sets auth cookie when `ADMIN_PASSWORD` matches.
- `/api/content` — GET/POST runtime content (merges with defaults if file missing).
- `/api/upload` — Auth-required file upload to `public/uploads`.
- `/api/delete-file` — Auth-required delete for uploaded files.
- `/api/instagram` — Uses `src/data/server-config.json` (ignored) to fetch IG media (unused when embedding).
- `/api/settings` — Admin-only settings persistence for `server-config.json`.

## Frontend Notes
- Navbar logo sourced from runtime content `branding.logo`; header favicon also uses this via metadata/head.
- Slideshow on home uses Instagram embed (no token required).
- Smooth page transitions via `app/template.tsx`.

## Scripts
- `npm run dev` — Dev server
- `npm run lint` — ESLint
- `npm run build` — Production build
- `npm run start` — Serve built app

## Env & Config
- `.env.local`: `ADMIN_PASSWORD=<strong password>`
- `src/data/server-config.json`: Instagram tokens if needed (ignored). Copy from example.
- `src/data/content.json`: Runtime content, created/updated by admin UI (ignored). Copy from example if you want starter data.

## Git Ignore / Runtime Data
- Ignored: `src/data/content.json`, `src/data/server-config.json`, `public/uploads/`, env files.
- Tracked examples: `src/data/content.example.json`, `src/data/server-config.example.json`.
