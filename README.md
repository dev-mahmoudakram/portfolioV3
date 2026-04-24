# Mahmoud Akram Portfolio

Premium purple neon portfolio monorepo for Mahmoud Akram, built with Next.js App Router, NestJS, Prisma, MySQL, Tailwind CSS, SCSS, GSAP, and Font Awesome.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind CSS, SCSS, GSAP, Font Awesome, SEO metadata
- `apps/api`: NestJS, TypeScript, Prisma ORM, MySQL
- `packages/types`: shared TypeScript contracts

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create the MySQL database in XAMPP phpMyAdmin or MySQL CLI:

```sql
CREATE DATABASE mahmoud_portfolio;
```

3. Create environment files:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

NestJS database URL:

```env
DATABASE_URL="mysql://root:@localhost:3306/mahmoud_portfolio"
PORT=4000
WEB_ORIGIN="http://localhost:3000"
```

Next.js API URL:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:migrate
```

5. Seed sample projects and skills:

```bash
npm run prisma:seed
```

6. Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

API: `http://localhost:4000`

## API Endpoints

- `GET /projects`
- `GET /projects/featured`
- `GET /projects/:slug`
- `POST /contact`
- `GET /skills`
- `GET /admin/health`

## Notes

- XAMPP MySQL defaults are assumed: host `localhost`, port `3306`, username `root`, empty password.
- The contact endpoint currently saves messages to MySQL and includes a clean placeholder location for adding email sending later.
- Project and character images are placeholders in `apps/web/public/images`; replace them with final brand visuals when ready.
