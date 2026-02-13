import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function ServicesPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const services = [
    { title: t('services.googleAds.title'), desc: t('services.googleAds.desc') },
    { title: t('services.facebookAds.title'), desc: t('services.facebookAds.desc') },
    { title: t('services.analytics.title'), desc: t('services.analytics.desc') },
    { title: t('services.landingPages.title'), desc: t('services.landingPages.desc') },
    { title: t('services.cro.title'), desc: t('services.cro.desc') },
    { title: t('services.seo.title'), desc: t('services.seo.desc') },
  ]

  return (
    <>
      <Section background="primary">
        <Container>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('services.hero.title')}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{t('services.hero.subtitle')}</p>
          <div className="mt-8">
            <Link href={`/${locale}/contact`}>
              <Button>{t('services.hero.cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={s.title}>
                <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
