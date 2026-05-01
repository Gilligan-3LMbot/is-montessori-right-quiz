# Is Montessori Right for My Child?

A mobile-first Next.js quiz app for Kingdom West Montessori.

## Stack

- Next.js (App Router)
- Vercel
- Supabase
- Resend
- Tailwind CSS v4

## What’s included

- Warm landing page with archetype preview
- 7-question quiz flow with progress bar
- Score + tag-based learner archetype logic
- Personalized results page
- Dynamic classroom guidance
- Chicagoland lead capture form
- Supabase-ready API route
- Resend-ready lead notification hook
- Shareable result card with download/share/copy actions

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>.

## Environment variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=admissions@yourdomain.com
LEAD_NOTIFICATION_TO=hello@yourdomain.com
```

## Supabase setup

Run the SQL in `supabase/schema.sql` inside the Supabase SQL editor.

This creates the `montessori_quiz_leads` table used by the results-page form.

## Deploying to Vercel

1. Push this app to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above.
4. Deploy.

## Notes

- Lead capture returns a friendly configuration error until Supabase env vars are set.
- Resend notifications are optional and only send when `RESEND_API_KEY`, `RESEND_FROM`, and `LEAD_NOTIFICATION_TO` are configured.
- Replace the illustration or typography with final Kingdom West Montessori brand assets anytime.
