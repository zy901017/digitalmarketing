import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AboutPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <>
      <Section background="primary">
        <Container>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('about.hero.title')}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{t('about.hero.subtitle')}</p>
          <div className="mt-8">
            <Link href={`/${locale}/contact`}>
              <Button>{t('about.hero.cta')}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-xl font-semibold text-slate-900">{t('about.hero.block1Title')}</h2>
              <p className="mt-2 text-slate-600">{t('about.hero.block1Desc')}</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-slate-900">{t('about.hero.block2Title')}</h2>
              <p className="mt-2 text-slate-600">{t('about.hero.block2Desc')}</p>
            </Card>
          </div>
          <Card className="mt-6">
            <h2 className="text-xl font-semibold text-slate-900">{t('about.hero.block3Title')}</h2>
            <p className="mt-2 text-slate-600">{t('about.hero.block3Desc')}</p>
          </Card>
        </Container>
      </Section>
    </>
  )
}
