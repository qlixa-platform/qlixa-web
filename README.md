# QLIXA Website

**Reports in one click** — Smart accounting platform for foreigners in Austria.

## Tech Stack
- [Next.js 14](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Vercel](https://vercel.com) — Hosting & deployment
- [Supabase](https://supabase.com) — Database (Phase 2)

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/                  # Pages (Next.js App Router)
    page.tsx            # Home page
    pricing/page.tsx    # Pricing page
    articles/page.tsx   # Articles listing
    layout.tsx          # Root layout
  components/
    layout/
      Navbar.tsx        # Navigation with dropdowns
      Footer.tsx        # Footer with FAQ
  styles/
    globals.css         # Global styles + QLIXA brand variables
public/
  logos/               # SVG logos (multi, orange, white)
```

## Deployment

Push to GitHub → Vercel auto-deploys on every commit.

## Brand
- Primary: `#FF7033` (Orange)
- Dark: `#353434` (Charcoal)
- Fonts: DM Sans + DM Serif Display
