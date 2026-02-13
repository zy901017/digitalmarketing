import { notFound } from 'next/navigation'
import { isValidLocale, type Locale, getMessages } from '@/lib/i18n'
import { I18nProvider } from '@/components/I18nProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'

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
  const messages = getMessages(locale)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyMobileCTA />
    </I18nProvider>
  )
}
