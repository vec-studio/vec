import en from './en.json'
import zh from './zh.json'

export const messages = {
  en,
  zh
}

export type Language = keyof typeof messages
export type Languages = Language[]

declare module 'use-intl' {
  interface AppConfig {
    Locale: Language
    Messages: (typeof messages)['en']
    timeZone: 'UTC'
  }
}
