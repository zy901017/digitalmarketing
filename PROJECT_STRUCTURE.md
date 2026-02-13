# Digital Marketing Freelancer Site - Project Structure

```
digital-marketing-site/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── api/
│   │   └── lead/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── Testimonial.tsx
│   │   ├── MetricGrid.tsx
│   │   └── FAQAccordion.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── LeadForm.tsx
│   ├── ContactForm.tsx
│   └── StickyMobileCTA.tsx
├── content/
│   └── case-studies/
│       ├── plumbing-lead-generation-en.mdx
│       ├── plumbing-lead-generation-zh.mdx
│       ├── electrician-conversion-en.mdx
│       ├── electrician-conversion-zh.mdx
│       ├── cleaning-ads-en.mdx
│       ├── cleaning-ads-zh.mdx
│       ├── landscaping-seo-en.mdx
│       └── landscaping-seo-zh.mdx
├── lib/
│   ├── i18n.ts
│   ├── case-studies.ts
│   ├── rate-limit.ts
│   └── resend.ts
├── messages/
│   ├── en.json
│   └── zh.json
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```
