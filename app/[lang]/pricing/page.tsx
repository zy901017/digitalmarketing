import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Metadata } from 'next'
import { createTranslator, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = createTranslator(params.lang as Locale)
  return {
    title: t('pricing.meta.title'),
    description: t('pricing.meta.description'),
  }
}

export default function PricingPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const tiers = [
    {
      key: 'starter',
      popular: false,
    },
    {
      key: 'growth',
      popular: true,
    },
    {
      key: 'scale',
      popular: false,
    },
  ] as const

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('pricing.hero.title')}</h1>
            <p className="text-xl text-slate-600">{t('pricing.hero.subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <Card key={tier.key} className={`p-8 relative ${tier.popular ? 'ring-2 ring-primary-500' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{t('pricing.popular')}</Badge>
                  </div>
                )}

                <h3 className="text-xl font-bold text-slate-900 mb-2">{t(`pricing.tiers.${tier.key}.name`)}</h3>
                <p className="text-slate-600 mb-6">{t(`pricing.tiers.${tier.key}.description`)}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{t(`pricing.tiers.${tier.key}.price`)}</span>
                  <span className="text-slate-500"> / {t('pricing.perMonth')}</span>
                </div>

                <ul className="space-y-3 text-slate-700 mb-8">
                  <li>• {t(`pricing.tiers.${tier.key}.features.0`)}</li>
                  <li>• {t(`pricing.tiers.${tier.key}.features.1`)}</li>
                  <li>• {t(`pricing.tiers.${tier.key}.features.2`)}</li>
                  <li>• {t(`pricing.tiers.${tier.key}.features.3`)}</li>
                </ul>

                <Link href={`/${locale}/contact`}>
                  <Button className="w-full" variant={tier.popular ? 'primary' : 'secondary'}>
                    {t('pricing.cta')}
                  </Button>
                </Link>

                <p className="text-sm text-slate-500 mt-4">{t('pricing.note')}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('pricing.bottom.title')}</h2>
            <p className="text-slate-600 mb-8">{t('pricing.bottom.subtitle')}</p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{t('pricing.bottom.cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
