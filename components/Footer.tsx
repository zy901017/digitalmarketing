import React from 'react'
import Link from 'next/link'

interface FooterProps {
  locale: 'en' | 'zh'
  t: (key: string) => string
}

export function Footer({ locale, t }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-display font-bold text-white mb-4">
              Digital<span className="text-primary-400">Growth</span>
            </div>
            <p className="text-slate-400 mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-sm text-slate-500">
              {t('footer.location')}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services`} className="hover:text-primary-400 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/case-studies`} className="hover:text-primary-400 transition-colors">
                  {t('nav.caseStudies')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pricing`} className="hover:text-primary-400 transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@digitalgrowth.com.au" className="hover:text-primary-400 transition-colors">
                  hello@digitalgrowth.com.au
                </a>
              </li>
              <li>
                <a href="tel:+61412345678" className="hover:text-primary-400 transition-colors">
                  +61 412 345 678
                </a>
              </li>
              <li className="pt-4">
                <Link href={`/${locale}/contact`}>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                    {t('footer.getStarted')}
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>© {currentYear} DigitalGrowth. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
