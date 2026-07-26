# Data Power Source

Marketing website for Data Power Source, a commercial and industrial electrical contractor serving Metro Atlanta and Georgia.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Phosphor icons
- Playwright

## Local development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment variables

`CONTACT_FORM_ENDPOINT` routes contact and quote form submissions to an approved CRM, email service, or form provider. If it is not configured, the form API returns the current project fallback response.

## Quality checks

```bash
npm run lint
npm run build
npm test
```

## Primary routes

- `/`
- `/services`
- `/about`
- `/about/safety`
- `/about/values`
- `/faq`
- `/contact`

## Deployment

The project is compatible with Vercel. Link and deploy only after the correct Vercel team, project, and production environment variables have been confirmed.
