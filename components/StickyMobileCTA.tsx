'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from './I18nProvider'

export function StickyMobileCTA() {
  const { locale, t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg z-40">
      <Link href={`/${locale}/contact`} className="block">
        <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          {t('stickyMobileCTA.text')}
        </button>
      </Link>
    </div>
  )
}
