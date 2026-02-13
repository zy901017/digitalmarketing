import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createTranslator, isValidLocale, type Locale } from '@/lib/i18n'
import { getAllCaseStudies, getIndustries, getServices } from '@/lib/case-studies'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function CaseStudiesPage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams?: { industry?: string; service?: string }
}) {
  if (!isValidLocale(params.lang)) notFound()
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const all = getAllCaseStudies(locale)
  const industries = getIndustries(locale)
  const services = getServices(locale)

  const industryFilter = searchParams?.industry
  const serviceFilter = searchParams?.service

  const filtered = all.filter((cs) => {
    const okIndustry = !industryFilter || cs.industry === industryFilter
    const okService = !serviceFilter || cs.services.includes(serviceFilter)
    return okIndustry && okService
  })

  return (
    <>
      <Section background="primary">
        <Container>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('caseStudies.hero.title')}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">{t('caseStudies.hero.subtitle')}</p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="flex flex-wrap gap-3 items-center mb-8">
            <span className="text-sm text-slate-600">{t('caseStudies.filters.title')}:</span>

            <Link href={`/${locale}/case-studies`} className="text-sm">
              <Badge variant={!industryFilter && !serviceFilter ? 'primary' : 'neutral'}>{t('caseStudies.filters.all')}</Badge>
            </Link>

            {industries.map((ind) => (
              <Link key={ind} href={`/${locale}/case-studies?industry=${encodeURIComponent(ind)}`} className="text-sm">
                <Badge variant={industryFilter === ind ? 'primary' : 'neutral'}>{ind}</Badge>
              </Link>
            ))}

            {services.slice(0, 6).map((svc) => (
              <Link key={svc} href={`/${locale}/case-studies?service=${encodeURIComponent(svc)}`} className="text-sm">
                <Badge variant={serviceFilter === svc ? 'secondary' : 'neutral'}>{svc}</Badge>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cs) => (
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

          {filtered.length === 0 && (
            <div className="text-center text-slate-600 mt-10">{t('caseStudies.filters.empty')}</div>
          )}
        </Container>
      </Section>
    </>
  )
}
