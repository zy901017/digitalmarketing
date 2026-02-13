import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function PricingPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const tiers = [
    {
      name: t('pricing.hero.tier1Name'),
      price: t('pricing.hero.tier1Price'),
      desc: t('pricing.hero.tier1Desc'),
      bullets: [t('pricing.hero.tier1B1'), t('pricing.hero.tier1B2'), t('pricing.hero.tier1B3')],
    },
    {
      name: t('pricing.hero.tier2Name'),
      price: t('pricing.hero.tier2Price'),
      desc: t('pricing.hero.tier2Desc'),
      bullets: [t('pricing.hero.tier2B1'), t('pricing.hero.tier2B2'), t('pricing.hero.tier2B3')],
      featured: true,
    },
    {
      name: t('pricing.hero.tier3Name'),
      price: t('pricing.hero.tier3Price'),
      desc: t('pricing.hero.tier3Desc'),
      bullets: [t('pricing.hero.tier3B1'), t('pricing.hero.tier3B2'), t('pricing.hero.tier3B3')],
    },
  ]

  return (
    <>
      <Section background="primary">
        <Container>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('pricing.hero.title')}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{t('pricing.hero.subtitle')}</p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <Card key={tier.name} className={tier.featured ? 'border-primary-300 shadow-lg' : ''}>
                {tier.featured && <Badge className="mb-3">{t('pricing.hero.mostPopular')}</Badge>}
                <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
                <div className="mt-2 text-3xl font-bold text-slate-900">{tier.price}</div>
                <p className="mt-2 text-slate-600">{tier.desc}</p>
                <ul className="mt-4 space-y-2 text-slate-700">
                  {tier.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href={`/${locale}/contact`}>
                    <Button className="w-full">{t('pricing.hero.cta')}</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
