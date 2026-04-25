# Mahmoud Akram Portfolio

Premium purple neon portfolio built as a single Next.js App Router application with Prisma and Supabase Postgres.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind CSS, SCSS, Framer Motion, GSAP, Font Awesome
- `packages/types`: shared TypeScript contracts
- Prisma ORM with Supabase PostgreSQL

The repository still contains `apps/api` from the earlier NestJS version, but the live portfolio now runs through `apps/web` only.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
```

3. Set your Supabase environment variables in `apps/web/.env.local`:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_API_URL="/api"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Use the pooled connection for `DATABASE_URL` and the direct connection for `DIRECT_URL`.

4. Generate the Prisma client and apply the web app migration:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed starter projects and skills:

```bash
npm run prisma:seed
```

6. Start the Next app:

```bash
npm run dev
```

App URL: `http://localhost:3000`

## App Routes

Public pages are handled by the App Router in `apps/web/src/app`.

App Router API routes:

- `GET /api/projects`
- `GET /api/projects/featured`
- `GET /api/projects/[slug]`
- `POST /api/contact`
- `GET /api/skills`
- `GET /health`

## Vercel Deployment

This project is intended to deploy as a single app on Vercel.

### Recommended Vercel settings

- Framework Preset: `Next.js`
- Root Directory: `apps/web`
- Build Command: `npm run build`
- Install Command: `npm install`

### Required Vercel Environment Variables

```env
DATABASE_URL="postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_API_URL="/api"
NEXT_PUBLIC_SITE_URL="https://your-vercel-domain.vercel.app"
```

After the first deploy, run the migration against Supabase:

```bash
npm run prisma:migrate:deploy
```

Then seed data once:

```bash
npm run prisma:seed
```

## Notes

- Prisma schema and migrations for the live app live in `apps/web/prisma`
- Server-side data access lives in `apps/web/src/server/portfolio-data.ts`
- Prisma client setup lives in `apps/web/src/lib/prisma.ts`
- If you do not want the old NestJS app anymore, you can remove `apps/api` later without affecting the live web app
