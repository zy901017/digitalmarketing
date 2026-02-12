import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { Metadata } from 'next'
import { createTranslator, type Locale } from '@/lib/i18n'
import { getAllCaseStudies, getIndustries, getServices } from '@/lib/case-studies'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = createTranslator(params.lang as Locale)
  return {
    title: t('caseStudies.meta.title'),
    description: t('caseStudies.meta.description'),
  }
}

export default function CaseStudiesPage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams?: { industry?: string; service?: string }
}) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const industryFilter = searchParams?.industry
  const serviceFilter = searchParams?.service

  const industries = getIndustries(locale)
  const services = getServices(locale)
  const all = getAllCaseStudies(locale)

  const filtered = all.filter((cs) => {
    if (industryFilter && cs.industry !== industryFilter) return false
    if (serviceFilter && !cs.services.includes(serviceFilter)) return false
    return true
  })

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('caseStudies.hero.title')}</h1>
            <p className="text-xl text-slate-600">{t('caseStudies.hero.subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href={`/${locale}/case-studies`} className="inline-block">
              <Badge variant={!industryFilter && !serviceFilter ? 'primary' : 'secondary'}>
                {t('caseStudies.filters.all')}
              </Badge>
            </Link>

            {industries.map((ind) => (
              <Link key={ind} href={`/${locale}/case-studies?industry=${encodeURIComponent(ind)}`}>
                <Badge variant={industryFilter === ind ? 'primary' : 'secondary'}>{ind}</Badge>
              </Link>
            ))}

            {services.map((svc) => (
              <Link key={svc} href={`/${locale}/case-studies?service=${encodeURIComponent(svc)}`}>
                <Badge variant={serviceFilter === svc ? 'primary' : 'secondary'}>{svc}</Badge>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cs) => (
              <Link key={cs.slug} href={`/${locale}/case-studies/${cs.slug}`}>
                <Card className="p-8 hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Badge>{cs.industry}</Badge>
                    {cs.featured && <Badge variant="primary">{t('caseStudies.filters.featured')}</Badge>}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cs.title}</h3>
                  <p className="text-slate-600 mb-5">{cs.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.services.slice(0, 3).map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-slate-600 mt-12">{t('caseStudies.filters.empty')}</div>
          )}
        </Container>
      </Section>
    </>
  )
}
