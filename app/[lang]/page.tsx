import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { getFeaturedCaseStudies } from '@/lib/case-studies'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MetricGrid } from '@/components/ui/MetricGrid'
import { Testimonial } from '@/components/ui/Testimonial'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { LeadForm } from '@/components/LeadForm'
import { Button } from '@/components/ui/Button'

export default function HomePage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const featured = getFeaturedCaseStudies(locale, 3)

  const faqs = [
    { q: t('home.faq.q1'), a: t('home.faq.a1') },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
    { q: t('home.faq.q3'), a: t('home.faq.a3') },
    { q: t('home.faq.q4'), a: t('home.faq.a4') },
    { q: t('home.faq.q5'), a: t('home.faq.a5') },
    { q: t('home.faq.q6'), a: t('home.faq.a6') },
    { q: t('home.faq.q7'), a: t('home.faq.a7') },
    { q: t('home.faq.q8'), a: t('home.faq.a8') },
  ]

  return (
    <>
      <Section background="primary" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="mt-5 text-lg text-slate-700">
                {t('home.hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`}>
                  <Button>{t('home.hero.primaryCta')}</Button>
                </Link>
                <Link href={`/${locale}/case-studies`}>
                  <Button variant="outline">{t('home.hero.secondaryCta')}</Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge>{t('home.trustBadges.google')}</Badge>
                <Badge variant="secondary">{t('home.trustBadges.meta')}</Badge>
                <Badge variant="neutral">{t('home.trustBadges.ga4')}</Badge>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">{t('home.hero.formTitle')}</h2>
              <p className="text-sm text-slate-600 mb-6">{t('home.hero.formSubtitle')}</p>
              <LeadForm compact />
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-slate-900">{t('home.howItWorks.title')}</h2>
            <p className="mt-3 text-slate-600">{t('home.howItWorks.subtitle')}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">{t('home.howItWorks.step1Title')}</h3>
              <p className="mt-2 text-slate-600">{t('home.howItWorks.step1Desc')}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">{t('home.howItWorks.step2Title')}</h3>
              <p className="mt-2 text-slate-600">{t('home.howItWorks.step2Desc')}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-slate-900">{t('home.howItWorks.step3Title')}</h3>
              <p className="mt-2 text-slate-600">{t('home.howItWorks.step3Desc')}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900">{t('home.services.title')}</h2>
              <p className="mt-2 text-slate-600">{t('home.services.subtitle')}</p>
            </div>
            <Link href={`/${locale}/services`} className="text-primary-600 font-medium hover:text-primary-700">
              {t('home.services.viewAll')} →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold">{t('home.services.googleTitle')}</h3>
              <p className="mt-2 text-slate-600">{t('home.services.googleDesc')}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">{t('home.services.metaTitle')}</h3>
              <p className="mt-2 text-slate-600">{t('home.services.metaDesc')}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">{t('home.services.trackingTitle')}</h3>
              <p className="mt-2 text-slate-600">{t('home.services.trackingDesc')}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900">{t('home.caseStudies.title')}</h2>
              <p className="mt-2 text-slate-600">{t('home.caseStudies.subtitle')}</p>
            </div>
            <Link href={`/${locale}/case-studies`} className="text-primary-600 font-medium hover:text-primary-700">
              {t('home.caseStudies.viewAll')} →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((cs) => (
              <Link key={cs.slug} href={`/${locale}/case-studies/${cs.slug}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="neutral">{cs.industry}</Badge>
                    {cs.services.slice(0, 2).map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{cs.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm">{cs.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900">{t('home.testimonials.title')}</h2>
              <p className="mt-2 text-slate-600">{t('home.testimonials.subtitle')}</p>
              <div className="mt-6 space-y-4">
                <Testimonial name={t('home.testimonials.t1Name')} role={t('home.testimonials.t1Role')} content={t('home.testimonials.t1Content')} />
                <Testimonial name={t('home.testimonials.t2Name')} role={t('home.testimonials.t2Role')} content={t('home.testimonials.t2Content')} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{t('home.faq.title')}</h3>
              <div className="mt-4">
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="primary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900">{t('home.finalCTA.title')}</h2>
              <p className="mt-2 text-slate-700">{t('home.finalCTA.subtitle')}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>• {t('home.risk.b1')}</li>
                <li>• {t('home.risk.b2')}</li>
                <li>• {t('home.risk.b3')}</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('home.finalCTA.formTitle')}</h3>
              <p className="text-sm text-slate-600 mb-6">{t('home.finalCTA.formSubtitle')}</p>
              <LeadForm compact />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
