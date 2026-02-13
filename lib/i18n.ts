import enMessages from '@/messages/en.json'
import zhMessages from '@/messages/zh.json'

export type Locale = 'en' | 'zh'

const messages = {
  en: enMessages,
  zh: zhMessages,
}

export function getMessages(locale: Locale) {
  return messages[locale] || messages.en
}

export function createTranslator(locale: Locale) {
  const msgs = getMessages(locale)
  
  return function t(key: string): string {
    const keys = key.split('.')
    let value: any = msgs
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}

export const locales: Locale[] = ['en', 'zh']

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
