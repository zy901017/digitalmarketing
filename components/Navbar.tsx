'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

interface NavbarProps {
  locale: 'en' | 'zh'
  t: (key: string) => string
}

export function Navbar({ locale, t }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.services'), href: `/${locale}/services` },
    { name: t('nav.caseStudies'), href: `/${locale}/case-studies` },
    { name: t('nav.pricing'), href: `/${locale}/pricing` },
    { name: t('nav.about'), href: `/${locale}/about` },
  ]
  
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`
    }
    return pathname.startsWith(href)
  }
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="flex items-center">
            <span className="text-2xl font-display font-bold text-primary-600">
              Digital<span className="text-slate-900">Growth</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <LanguageSwitcher currentLocale={locale} />
            
            <Link href={`/${locale}/contact`}>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                {t('nav.contact')}
              </button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 font-medium ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                {t('nav.contact')}
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
