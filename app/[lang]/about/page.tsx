import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Metadata } from 'next'
import { createTranslator, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = createTranslator(params.lang as Locale)
  return {
    title: t('about.meta.title'),
    description: t('about.meta.description'),
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const locale = params.lang as Locale
  const t = createTranslator(locale)

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <Badge className="mb-4">{locale === 'en' ? 'Adelaide, Australia' : '澳大利亚 · 阿德莱德'}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('about.hero.title')}</h1>
            <p className="text-xl text-slate-600">{t('about.hero.subtitle')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{locale === 'en' ? 'How I work' : '我的工作方式'}</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>{locale === 'en'
                  ? 'I work with local trades and home service businesses to generate more qualified enquiries while keeping costs under control. The focus is simple: strong targeting, clear messaging, and tracking that you can trust.'
                  : '我专注服务本地 Trades / Home Services（维修、安装、清洁、园艺等），目标是：在控制成本的同时，获得更多“真实能成交”的咨询线索。核心方法很简单：更精准的意图定位、更清晰的文案、更可靠的追踪。'}</p>
                <p>{locale === 'en'
                  ? 'Most accounts fail because of wasted search terms, weak landing pages, and broken conversion tracking. We fix the fundamentals first, then scale what works.'
                  : '很多广告账户效果差，并不是“行业不行”，而是：搜索词浪费、落地页漏水、转化追踪不准。我的做法是先把基础打牢，再去放大有效策略。'}</p>
                <p>{locale === 'en'
                  ? 'You’ll get clear deliverables, simple reporting, and a practical plan you can understand.'
                  : '合作过程中你会拿到清晰的交付清单、简单明了的汇报，以及你能真正执行的增长计划。'}</p>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{locale === 'en' ? 'What you get' : '你能得到什么'}</h3>
              <ul className="space-y-3 text-slate-700">
                <li>• {locale === 'en' ? 'A conversion-first strategy' : '以转化为核心的策略'}</li>
                <li>• {locale === 'en' ? 'GA4/GTM tracking you can trust' : '可靠的 GA4/GTM 追踪'}</li>
                <li>• {locale === 'en' ? 'Transparent reporting' : '透明的汇报机制'}</li>
                <li>• {locale === 'en' ? 'Month-to-month flexibility' : '按月合作更灵活'}</li>
              </ul>
              <div className="mt-8">
                <Link href={`/${locale}/contact`}>
                  <Button className="w-full">{locale === 'en' ? 'Get Free Audit' : '获取免费审计'}</Button>
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{locale === 'en' ? 'Ready to grow?' : '准备开始增长了吗？'}</h2>
            <p className="text-slate-600 mb-8">{locale === 'en'
              ? 'Get a free audit and a 7-day action plan. No obligation.'
              : '免费审计 + 7 天行动计划，无需承诺。'}</p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg">{locale === 'en' ? 'Book a Free Strategy Call' : '预约免费策略沟通'}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
