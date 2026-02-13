'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from './I18nProvider'

export function Footer() {
  const { locale, t } = useI18n()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-display font-bold text-white mb-4">
              Digital<span className="text-primary-400">Growth</span>
            </div>
            <p className="text-slate-400 mb-4">{t('footer.tagline')}</p>
            <p className="text-sm text-slate-500">{t('footer.location')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-white transition-colors">{t('nav.services')}</Link></li>
              <li><Link href={`/${locale}/case-studies`} className="hover:text-white transition-colors">{t('nav.caseStudies')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Google Ads</li>
              <li>Meta Ads</li>
              <li>GA4 & Tracking</li>
              <li>Landing Page CRO</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500">© {currentYear} DigitalGrowth. {t('footer.rights')}</p>
          <p className="text-sm text-slate-500">{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
