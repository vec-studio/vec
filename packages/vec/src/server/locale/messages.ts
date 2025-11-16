import en from '~/messages/en.json'
import zh from '~/messages/zh.json'

export const messages = {
  en,
  zh
}

export type Locale = keyof typeof messages
export type Locales = Locale[]
export type Messages = (typeof messages)[Locale]

declare module 'use-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: Messages
    timeZone: 'UTC'
  }
}
