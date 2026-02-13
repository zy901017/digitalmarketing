# Remaining Code Files

## Case Studies (create these in content/case-studies/)

### electrician-conversion-zh.mdx
```mdx
---
slug: electrician-conversion-optimization
lang: zh
title: 电工业务转化率翻倍
summary: 全面的转化率优化和着陆页重新设计使本地电气承包商的预订量增加了112%。
industry: 电气
services:
  - 转化率优化
  - 着陆页
  - A/B测试
date: 2024-02-10
featured: true
metrics:
  - label: 转化率增加
    value: +112%
  - label: 跳出率降低
    value: -41%
  - label: 页面平均停留时间
    value: +68%
---

## 项目快照

阿德莱德一家成熟的电气承包商网站每月获得约800名访问者的不错流量，但只有1.8%转化为潜在客户。他们在SEO和Google广告上投入了大量资金，但没有看到证明投资合理的预订量。

## 挑战

- 转化率低：每月从800多名访问者中只有14-15个潜在客户
- 移动体验差：70%的流量来自移动设备，但网站未优化
- 导航混乱：访问者无法快速找到所需内容
- 行动号召弱：CTA被隐藏且不突出
- 无信任信号：缺少评论、认证、保证

## 成果

经过3个月的系统优化：
- 转化率从1.8%提高到3.8%（+112%）
- 月度潜在客户从14增加到30（+114%）
- 跳出率从58%降至34%（-41%）
- 页面平均停留时间增加68%
- 移动转化率从1.2%提高到3.1%
```

### cleaning-ads-en.mdx
```mdx
---
slug: home-cleaning-facebook-ads
lang: en
title: Home Cleaning Service Scales with Facebook Ads
summary: Strategic Facebook Ads campaign helped a home cleaning service expand to 3 new suburbs and increase monthly bookings by 84%.
industry: Home Services
services:
  - Facebook Ads
  - Landing Pages
  - Lead Generation
date: 2024-03-05
featured: false
metrics:
  - label: Increase in Monthly Bookings
    value: +84%
  - label: Cost Per Lead
    value: $12.50
  - label: Ad Spend ROI
    value: 5.8:1
---

## Project Snapshot

A home cleaning service covering Adelaide's eastern suburbs wanted to expand their service area and attract more regular clients. They had tried Facebook Ads before but struggled with high costs and low-quality leads.

## The Challenge

- Previous Facebook campaigns generated leads but most didn't convert to bookings
- Cost per lead was $35-40, making it hard to be profitable
- No system for tracking which leads became customers
- Generic ad creative that didn't stand out in the feed

## Our Strategy

**1. Audience Targeting Refinement**
- Created lookalike audiences based on existing customers
- Targeted homeowners in specific high-value suburbs
- Excluded low-intent audiences

**2. Creative Strategy**
- Before/after photos of cleaning results
- Video testimonials from happy customers
- Special offers for first-time bookings

**3. Lead Qualification**
- Added pre-qualifying questions to lead forms
- Implemented instant email responses with booking information
- Set up automated follow-up sequence

## Results

- Cost per lead dropped to $12.50 (-64%)
- 84% increase in monthly bookings
- Expanded successfully to 3 new suburbs
- 5.8:1 return on ad spend
```

### cleaning-ads-zh.mdx, landscaping-seo-en.mdx, landscaping-seo-zh.mdx
[Similar format to above - create with industry-specific content]

## App Layout Files

### app/layout.tsx
```typescript
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

### app/page.tsx
```typescript
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}
```

### app/[lang]/layout.tsx
```typescript
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }]
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLocale(params.lang)) {
    notFound()
  }

  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <html lang={locale}>
      <body>
        <Navbar locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
        <StickyMobileCTA locale={locale} text={t('stickyMobileCTA')} />
      </body>
    </html>
  )
}
```

### app/[lang]/page.tsx (Home Page)
```typescript
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MetricGrid } from '@/components/ui/MetricGrid'
import { Testimonial } from '@/components/ui/Testimonial'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { LeadForm } from '@/components/LeadForm'
import { createTranslator, type Locale } from '@/lib/i18n'
import { getFeaturedCaseStudies } from '@/lib/case-studies'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = createTranslator(params.lang as Locale)
  return {
    title: t('home.hero.title'),
    description: t('home.hero.subtitle'),
  }
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)
  const featuredCases = getFeaturedCaseStudies(locale, 3)

  const testimonials = [
    {
      quote: "Within 3 months, we went from 12 leads per month to over 30. The quality is much better too - most actually convert to jobs now.",
      author: "Local Business Owner",
      role: "Owner",
      company: "Adelaide Plumbing Services"
    },
    {
      quote: "Finally someone who explains things in plain English and actually delivers results. Our phone hasn't stopped ringing since we started.",
      author: "Trade Professional",
      role: "Director",
      company: "Electrical Contracting Business"
    },
    {
      quote: "Best decision we made for our business. The ROI on our ad spend has tripled and we're expanding to new service areas.",
      author: "Service Provider",
      role: "Founder",
      company: "Home Cleaning Company"
    }
  ]

  const faqs = [
    {
      question: locale === 'en' ? "How quickly will I see results?" : "多久能看到结果？",
      answer: locale === 'en' 
        ? "Most clients see improvement within the first 30 days. Significant results typically come after 60-90 days as we optimize campaigns based on real data."
        : "大多数客户在前30天内看到改善。通常在60-90天后看到显著结果，因为我们根据实际数据优化营销活动。"
    },
    {
      question: locale === 'en' ? "Do you require long-term contracts?" : "需要签长期合同吗？",
      answer: locale === 'en'
        ? "No. We work on a month-to-month basis with 30 days notice to cancel. We're confident in our results and don't need to lock you in."
        : "不需要。我们按月合作，取消需提前30天通知。我们对结果充满信心，不需要锁定您。"
    },
    {
      question: locale === 'en' ? "What if I've tried Google Ads before and it didn't work?" : "如果我之前尝试过Google广告但没有效果怎么办？",
      answer: locale === 'en'
        ? "This is common. Usually it's due to poor targeting, weak ad copy, or no conversion tracking. We'll audit your previous campaigns and show you exactly what went wrong and how to fix it."
        : "这很常见。通常是由于定位不佳、广告文案弱或没有转化跟踪。我们将审核您之前的营销活动，并准确显示出了什么问题以及如何修复。"
    },
    {
      question: locale === 'en' ? "How much should I spend on ads?" : "我应该在广告上花多少钱？",
      answer: locale === 'en'
        ? "It depends on your goals and competition. For most trades and home services in Adelaide, we recommend starting with $1,500-3,000/month. We'll provide specific recommendations based on your situation."
        : "这取决于您的目标和竞争。对于阿德莱德的大多数行业和家庭服务，我们建议从每月1,500-3,000澳元开始。我们将根据您的情况提供具体建议。"
    },
    {
      question: locale === 'en' ? "Do you work with businesses outside Adelaide?" : "你们与阿德莱德以外的企业合作吗？",
      answer: locale === 'en'
        ? "While we specialize in Adelaide businesses, we can work with businesses anywhere in Australia. Our strategies work for any local service business."
        : "虽然我们专注于阿德莱德企业，但我们可以与澳大利亚任何地方的企业合作。我们的策略适用于任何本地服务企业。"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <Section background="primary" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-8">
                {t('home.hero.subtitle')}
              </p>
            </div>
            
            <div className="animate-scale-in">
              <Card>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">
                  {t('home.hero.cta')}
                </h3>
                <LeadForm t={t} compact />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Badges */}
      <Section background="white" spacing="sm">
        <Container>
          <h3 className="text-center text-slate-600 mb-6 font-medium">
            {t('home.trustBadges.title')}
          </h3>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-4xl font-bold text-slate-700">Google Ads</div>
            <div className="text-4xl font-bold text-slate-700">Meta</div>
            <div className="text-4xl font-bold text-slate-700">GA4</div>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section background="gray">
        <Container>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-12">
            {t('home.howItWorks.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <Card key={step} className="text-center" hover>
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t(`home.howItWorks.step${step}.title`)}
                </h3>
                <p className="text-slate-600">
                  {t(`home.howItWorks.step${step}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('home.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {['googleAds', 'facebookAds', 'seo', 'analytics', 'landingPages', 'cro'].map((service) => (
              <Card key={service} hover>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t(`services.${service}.title`)}
                </h3>
                <p className="text-slate-600 mb-4">
                  {t(`services.${service}.description`)}
                </p>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href={`/${locale}/services`}>
              <Button size="lg">{t('nav.services')}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Case Studies */}
      <Section background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              {t('home.caseStudies.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredCases.map((caseStudy) => (
              <Link key={caseStudy.slug} href={`/${locale}/case-studies/${caseStudy.slug}`}>
                <Card hover className="h-full">
                  <Badge className="mb-3">{caseStudy.industry}</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {caseStudy.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {caseStudy.summary}
                  </p>
                  <MetricGrid metrics={caseStudy.metrics} columns={2} />
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href={`/${locale}/case-studies`}>
              <Button variant="outline" size="lg">{t('home.caseStudies.viewAll')}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-12">
            {t('home.testimonials.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="gray">
        <Container size="md">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-slate-900 mb-12">
            {t('home.faq.title')}
          </h2>
          
          <FAQAccordion items={faqs} />
        </Container>
      </Section>

      {/* Risk Reversal */}
      <Section background="primary">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8">
              {t('home.risk.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item}>
                  <div className="text-4xl mb-3">✓</div>
                  <p className="text-lg font-semibold text-slate-900">
                    {t(`home.risk.item${item}`)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section background="white">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
              {t('home.finalCTA.title')}
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              {t('home.finalCTA.subtitle')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{t('home.finalCTA.cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
```

## Other Pages (create similar structure for):
- app/[lang]/services/page.tsx
- app/[lang]/about/page.tsx
- app/[lang]/pricing/page.tsx
- app/[lang]/case-studies/page.tsx
- app/[lang]/case-studies/[slug]/page.tsx
- app/[lang]/contact/page.tsx

Use similar structure to home page with appropriate content sections.

## Public Files

### public/robots.txt
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### public/sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/en</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/zh</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```
