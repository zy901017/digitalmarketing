import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { MetricGrid } from '@/components/ui/MetricGrid'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export async function generateStaticParams() {
  const langs: Locale[] = ['en', 'zh']
  const params: { lang: string; slug: string }[] = []

  for (const lang of langs) {
    const all = getAllCaseStudies(lang)
    for (const cs of all) params.push({ lang, slug: cs.slug })
  }
  return params
}

export default function CaseStudyDetailPage({ params }: { params: { lang: string; slug: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const cs = getCaseStudyBySlug(params.slug, locale)
  if (!cs) notFound()

  return (
    <>
      <Section background="primary" spacing="md">
        <Container>
          <Link href={`/${locale}/case-studies`} className="text-primary-700 hover:text-primary-800 font-medium">
            ← {t('caseStudies.details.back')}
          </Link>

          <h1 className="mt-4 text-4xl font-display font-bold text-slate-900">{cs.title}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{cs.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="neutral">{cs.industry}</Badge>
            {cs.services.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>

          <div className="mt-8">
            <MetricGrid metrics={cs.metrics} />
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container size="md">
          <Card className="prose prose-slate max-w-none">
            <MDXRemote source={cs.content} />
          </Card>

          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{t('caseStudies.details.ctaTitle')}</h3>
              <p className="mt-1 text-slate-600">{t('caseStudies.details.ctaSubtitle')}</p>
            </div>
            <Link href={`/${locale}/contact`}>
              <Button>{t('caseStudies.details.ctaButton')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
