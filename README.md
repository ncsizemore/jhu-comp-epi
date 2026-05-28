# JHU Computational Epidemiology Lab Website

Next.js site for the Johns Hopkins Computational Epidemiology Lab.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Common Commands

```bash
npm run lint
npm run test:run
npm run build
```

## Project Notes

- Homepage entry point: `src/app/page.tsx`
- Homepage JHEEM findings map: `docs/homepage-findings-map.md`
- Publication source data and PDFs: `docs/publications/`

## Deployment

The site is built with Next.js. Production builds should pass `npm run build`
before deployment.

The homepage findings map fetches live JHEEM summary data server-side with a
24-hour revalidation interval. See `docs/homepage-findings-map.md` for the data
contract and failure behavior.
