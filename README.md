# Personal Blog

A full-stack personal blogging platform for documenting travel, daily life, and
recommendations, with a single-author admin dashboard for publishing.

See [`docs/PROJECT.md`](docs/PROJECT.md) for the full spec and
[`docs/ROADMAP.md`](docs/ROADMAP.md) for milestone tracking.

## Apps

This is **not** an npm workspace — each app is independently installable and
deployable, per the project's structure philosophy.

| App | Path | Stack | Purpose |
|---|---|---|---|
| Blog | `apps/blog` | React + Vite | Public-facing site |
| Admin | `apps/admin` | React + Vite | Author's dashboard |
| API | `apps/api` | Node + Express + MongoDB | Backend for both apps |

## Getting started

Install dependencies for all three apps:

```bash
npm run install:all
```

Then run each app in its own terminal:

```bash
npm run dev:api     # http://localhost:5000
npm run dev:blog    # http://localhost:5173
npm run dev:admin   # http://localhost:5174
```

Check the API is up:

```bash
curl http://localhost:5000/health
```

## Environment variables

Each app that needs secrets has its own `.env` (gitignored). Copy the
`.env.example` in `apps/api` to `.env` and adjust as needed:

```bash
cp apps/api/.env.example apps/api/.env
```

## Git workflow

- `main` is always deployable.
- Feature work happens on `feature/<name>` branches.
- One milestone = one commit (or a small set), per `docs/ROADMAP.md`.
