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
    title: t('services.meta.title'),
    description: t('services.meta.description'),
  }
}

export default function ServicesPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const serviceCards = [
    {
      key: 'googleAds',
      badge: 'Google Ads',
      href: `/${locale}/contact`,
    },
    {
      key: 'facebookAds',
      badge: 'Meta Ads',
      href: `/${locale}/contact`,
    },
    {
      key: 'seo',
      badge: 'SEO',
      href: `/${locale}/contact`,
    },
    {
      key: 'analytics',
      badge: 'GA4 / Tracking',
      href: `/${locale}/contact`,
    },
    {
      key: 'landingPages',
      badge: locale === 'en' ? 'Landing Pages' : '落地页',
      href: `/${locale}/contact`,
    },
    {
      key: 'cro',
      badge: locale === 'en' ? 'CRO' : '转化率优化',
      href: `/${locale}/contact`,
    },
  ] as const

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('services.hero.title')}</h1>
            <p className="text-xl text-slate-600">{t('services.hero.subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((s) => (
              <Card key={s.key} className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge>{s.badge}</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`services.${s.key}.title`)}</h3>
                <p className="text-slate-600 mb-6">{t(`services.${s.key}.description`)}</p>
                <ul className="space-y-2 text-slate-700 mb-8">
                  <li>• {t(`services.${s.key}.features.0`)}</li>
                  <li>• {t(`services.${s.key}.features.1`)}</li>
                  <li>• {t(`services.${s.key}.features.2`)}</li>
                </ul>

                <Link href={s.href}>
                  <Button className="w-full">{t('services.meta.cta')}</Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('services.meta.processTitle')}</h2>
            <p className="text-slate-600 mb-8">{t('services.meta.processSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8">
              <h3 className="font-bold text-slate-900 mb-2">1) {t('services.meta.process.0.title')}</h3>
              <p className="text-slate-600">{t('services.meta.process.0.description')}</p>
            </Card>
            <Card className="p-8">
              <h3 className="font-bold text-slate-900 mb-2">2) {t('services.meta.process.1.title')}</h3>
              <p className="text-slate-600">{t('services.meta.process.1.description')}</p>
            </Card>
            <Card className="p-8">
              <h3 className="font-bold text-slate-900 mb-2">3) {t('services.meta.process.2.title')}</h3>
              <p className="text-slate-600">{t('services.meta.process.2.description')}</p>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{t('services.meta.bottomCTA')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
