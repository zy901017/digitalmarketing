'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface LanguageSwitcherProps {
  currentLocale: 'en' | 'zh'
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const switchLanguage = (newLocale: 'en' | 'zh') => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPathname)
  }
  
  return (
    <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('zh')}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          currentLocale === 'zh'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        中文
      </button>
    </div>
  )
}
