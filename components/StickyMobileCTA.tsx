'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface StickyMobileCTAProps {
  locale: 'en' | 'zh'
  text: string
}

export function StickyMobileCTA({ locale, text }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg transition-transform duration-300 z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link href={`/${locale}/contact`}>
        <button className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md">
          {text}
        </button>
      </Link>
    </div>
  )
}
