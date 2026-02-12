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
  if (!isValidLocale(params.lang)) notFound()

  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <>
      <Navbar locale={locale} t={t} />
      <main>{children}</main>
      <Footer locale={locale} t={t} />
      <StickyMobileCTA locale={locale} text={t('stickyMobileCTA')} />
    </>
  )
}
