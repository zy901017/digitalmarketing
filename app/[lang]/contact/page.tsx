import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/ContactForm'

export default function ContactPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <>
      <Section background="primary">
        <Container>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('contact.hero.title')}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{t('contact.hero.subtitle')}</p>
        </Container>
      </Section>

      <Section background="white">
        <Container size="md">
          <ContactForm />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div>
              <div className="font-semibold text-slate-900 mb-1">{t('contact.info.responseTitle')}</div>
              <div>{t('contact.info.responseDesc')}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">{t('contact.info.locationTitle')}</div>
              <div>{t('contact.info.locationDesc')}</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">{t('contact.info.nextTitle')}</div>
              <div>{t('contact.info.nextDesc')}</div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
