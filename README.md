# Wecare scaffold (Next.js + TypeScript + Prisma + PostgreSQL)

This repository contains the scaffold with authentication + RBAC.

## Prerequisites

- Docker + Docker Compose
- Node.js 20+
- npm

## Run locally (step-by-step)

1. Start PostgreSQL in Docker:

```bash
docker compose up -d db
```

2. Create your local env file:

```bash
cp .env.example .env
```

3. Add a JWT secret in `.env`:

```env
JWT_SECRET="replace-with-a-long-random-secret"
```

4. Install dependencies:

```bash
npm install
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev
```

6. Seed the database (creates admin user):

```bash
npx prisma db seed
```

Admin credentials:

- Email: `admin@wecare.local`
- Password: `Admin123!`

7. Start the Next.js dev server:

```bash
npm run dev
```

8. Open http://localhost:3000 and login at `/login`.

## Auth + RBAC overview

- Roles: `ADMIN`, `MENTOR`, `MENTEE`
- Auth APIs:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- Route guards:
  - `/group/*` requires any authenticated user
  - `/admin/*` requires `ADMIN`
