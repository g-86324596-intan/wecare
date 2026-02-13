# Wecare scaffold (Next.js + TypeScript + Prisma + PostgreSQL)

This repository contains only the initial stack scaffolding for Wecare.

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

3. Install dependencies:

```bash
npm install
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start the Next.js dev server:

```bash
npm run dev
```

6. Open http://localhost:3000

## Included stack

- Next.js (App Router) + TypeScript
- Prisma ORM
- PostgreSQL via Docker Compose (`db` service)
