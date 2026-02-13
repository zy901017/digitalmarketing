'use client'

import React, { createContext, useContext, useMemo } from 'react'

export type Messages = Record<string, any>

type I18nContextValue = {
  locale: 'en' | 'zh'
  messages: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: 'en' | 'zh'
  messages: Messages
  children: React.ReactNode
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

function getNested(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')

  const t = (key: string) => {
    const value = getNested(ctx.messages, key)
    return (typeof value === 'string' && value) ? value : key
  }

  return { locale: ctx.locale, t }
}
