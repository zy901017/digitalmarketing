import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createTranslator, type Locale } from '@/lib/i18n'
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/case-studies'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const all = getAllCaseStudies()
  return all.map((cs) => ({ lang: cs.lang, slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const locale = params.lang as Locale
  const cs = getCaseStudyBySlug(params.slug, locale)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
    },
  }
}

const mdxComponents = {
  h2: (props: any) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4" {...props} />,
  li: (props: any) => <li {...props} />,
}

export default function CaseStudyDetailPage({ params }: { params: { lang: string; slug: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  const cs = getCaseStudyBySlug(params.slug, locale)
  if (!cs) notFound()

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{cs.industry}</Badge>
              {cs.services.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{cs.title}</h1>
            <p className="text-xl text-slate-600">{cs.summary}</p>

            <div className="mt-6">
              <Link href={`/${locale}/case-studies`} className="text-primary-600 hover:underline">
                ← {t('caseStudies.details.back')}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-8">
                <MDXRemote source={cs.content} components={mdxComponents} />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('caseStudies.details.metrics')}</h2>
                <div className="space-y-3">
                  {cs.metrics?.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-slate-600">{m.label}</span>
                      <span className="font-semibold text-slate-900">{m.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-3">{t('caseStudies.details.ctaTitle')}</h2>
                <p className="text-slate-600 mb-6">{t('caseStudies.details.ctaSubtitle')}</p>
                <Link href={`/${locale}/contact`} className="inline-block text-center w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  {t('caseStudies.details.cta')}
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
