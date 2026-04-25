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

Next.js environment:

```env
DATABASE_URL="mysql://root:@localhost:3306/mahmoud_portfolio"
NEXT_PUBLIC_API_URL="/api"
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

## Plesk Deployment

Because the public API now runs through Next.js route handlers, you can deploy the portfolio as a single Node.js app on one Plesk domain.

Generate the upload-ready bundle locally:

```bash
npm run deploy:plesk:web
```

Generated folder:

- `deploy-output/plesk/web`

### Plesk Setup

Upload the contents of `deploy-output/plesk/web` to the frontend domain application root.

Use these Plesk values:

- Application Root: folder containing uploaded frontend bundle
- Document Root: `public` for root standalone builds, or `apps/web/public` if the bundle contains `apps/web/server.js`
- Application Startup File: `app.js`

Set frontend environment variables in Plesk:

```env
NODE_ENV=production
DATABASE_URL=mysql://DB_USER:DB_PASS@localhost:3306/mahmoud_portfolio
NEXT_PUBLIC_SITE_URL=https://mahmoud-akram.duckdns.org
NEXT_PUBLIC_API_URL=/api
PORT=3000
HOSTNAME=0.0.0.0
```

Then:

1. `NPM install`
2. `Run script` -> `prisma:generate`
3. `Run script` -> `prisma:migrate:deploy`
4. `Restart App`

The separate NestJS app remains in the repository for local development and future multi-app deployments, but it is not required for the single-domain Plesk deployment.
