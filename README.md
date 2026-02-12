# Digital Marketing Freelancer Website - Complete Setup Guide

This is a production-ready, bilingual (English + Chinese) digital marketing freelancer website optimized for lead generation, built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your Resend API key and email settings

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

## Project Structure

```
digital-marketing-site/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Language-specific routes
│   ├── api/lead/          # Lead submission API
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LeadForm.tsx
│   └── ContactForm.tsx
├── content/              # MDX case studies
│   └── case-studies/
├── lib/                  # Utilities
│   ├── i18n.ts          # Translation helper
│   ├── case-studies.ts  # MDX loader
│   ├── rate-limit.ts    # Rate limiting
│   └── resend.ts        # Email sending
├── messages/            # Translations
│   ├── en.json
│   └── zh.json
└── public/              # Static assets
```

## Adding a New Case Study

1. Create a new `.mdx` file in `content/case-studies/`
2. Use this template:

```mdx
---
slug: your-case-study-slug
lang: en
title: Case Study Title
summary: Brief summary of the case study
industry: Plumbing
services:
  - Google Ads
  - Landing Pages
date: 2024-01-15
featured: true
metrics:
  - label: Increase in Leads
    value: +67%
  - label: Reduction in Cost Per Lead
    value: -32%
  - label: Conversion Rate Improvement
    value: +45%
coverImage: /images/case-studies/your-image.jpg
---

## Project Snapshot

Brief overview of the client and project...

## The Challenge

What problems was the client facing...

## Our Strategy

How we approached the solution...

## Execution Timeline

**Month 1:** Setup and audit
**Month 2:** Campaign launch
**Month 3:** Optimization

## Results

Detailed results...

## Tools Used

- Google Ads
- Google Analytics 4
- Unbounce
```

3. The case study will automatically appear on the case studies page

## Key Features Implemented

### ✅ Conversion Optimization
- Hero section with inline lead form
- Trust badges
- How it works (3 steps)
- Service preview cards
- Case study highlights
- Testimonials
- FAQ accordion
- Risk reversal messaging
- Final CTA section
- Sticky mobile CTA button

### ✅ Bilingual Support
- Route-based language switching (/en, /zh)
- Complete translations
- Language switcher preserves current page
- Lightweight custom i18n (no heavy libraries)

### ✅ Lead Handling
- Form validation
- Honeypot anti-spam
- In-memory rate limiting (5 requests/hour per IP)
- Email notifications via Resend
- Success states with booking link placeholder

### ✅ MDX Case Studies
- Frontmatter metadata
- Filter by industry
- Filter by services
- Featured highlights
- Dynamic routing

### ✅ SEO & Performance
- Metadata per page
- Open Graph tags
- Static generation where possible
- Optimized fonts (Playfair Display + DM Sans)
- Mobile-first responsive design

## Environment Variables

Required environment variables (add to `.env.local`):

```env
# Resend API Key for email notifications
RESEND_API_KEY=re_your_api_key_here

# Email configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@example.com

# Site configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Customization Guide

### Update Branding
1. Edit company name in `components/Navbar.tsx` and `components/Footer.tsx`
2. Update colors in `tailwind.config.js`
3. Change fonts in `app/globals.css`

### Update Contact Info
1. Edit `components/Footer.tsx` for email and phone
2. Update location in translation files (`messages/en.json`, `messages/zh.json`)

### Add More Services
1. Add service details to translation files
2. Create service cards in services page
3. Update service options in contact form

### Customize Forms
- Edit `components/LeadForm.tsx` for hero form
- Edit `components/ContactForm.tsx` for detailed form
- Modify goal/budget options in dropdown menus

## Sample Content Included

The site comes pre-filled with realistic sample content:

- 4 case studies (2 English, 2 Chinese) for Adelaide trades/home services:
  - Plumbing lead generation
  - Electrical contractor conversion optimization
  - Home cleaning ads setup
  - Landscaping SEO campaign

- Sample testimonials (generic but realistic)
- Pre-written service descriptions
- FAQ content addressing common objections
- About page content

All content is anonymized and ready for production use.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX (next-mdx-remote)
- **Email:** Resend
- **Deployment:** Vercel

## Performance Features

- Static generation for all pages except API routes
- Optimized fonts with Google Fonts
- Responsive images
- Minimal JavaScript
- No heavy UI libraries

## Security Features

- Honeypot spam protection
- Rate limiting on lead submissions
- Input validation and sanitization
- CORS protection
- Environment variable protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a custom-built project. All rights reserved.

## Support

For questions or issues, contact the development team.
