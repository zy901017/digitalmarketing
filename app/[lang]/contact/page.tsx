import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ContactForm } from '@/components/ContactForm'
import { Metadata } from 'next'
import { createTranslator, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = createTranslator(params.lang as Locale)
  return {
    title: t('contact.meta.title'),
    description: t('contact.meta.description'),
  }
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <Badge className="mb-4">{t('contact.hero.badge')}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('contact.hero.title')}</h1>
            <p className="text-xl text-slate-600">{t('contact.hero.subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <ContactForm t={t} />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('contact.sidebar.title')}</h2>
                <div className="space-y-3 text-slate-700">
                  <div>
                    <div className="text-slate-500 text-sm">{t('contact.sidebar.response')}</div>
                    <div className="font-semibold">{t('contact.sidebar.responseValue')}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-sm">{t('contact.sidebar.location')}</div>
                    <div className="font-semibold">{t('contact.sidebar.locationValue')}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-sm">{t('contact.sidebar.note')}</div>
                    <div className="text-slate-600">{t('contact.sidebar.noteValue')}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3">{t('contact.sidebar.ctaTitle')}</h2>
                <p className="text-slate-600 mb-6">{t('contact.sidebar.ctaSubtitle')}</p>
                <a
                  href="#"
                  className="inline-block text-center w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t('contact.sidebar.cta')}
                </a>
                <p className="text-xs text-slate-500 mt-3">{t('contact.sidebar.ctaNote')}</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
