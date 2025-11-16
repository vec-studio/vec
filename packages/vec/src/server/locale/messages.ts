import type En from '~/messages/en.json'
import type Zh from '~/messages/zh.json'

export type Messages = typeof En | typeof Zh

export type Locale = 'en' | 'zh'
export type Locales = Locale[]

declare module 'use-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: Messages
    timeZone: 'UTC'
  }
}
