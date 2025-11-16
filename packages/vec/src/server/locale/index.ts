import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders, setCookie } from '@tanstack/react-start/server'
import { contextMiddleware } from '~/src/middleware'
import { type Language, type Languages, messages } from './messages'
import { pick } from './utils'

export const initLocaleServerFn = createServerFn()
  .middleware([contextMiddleware])
  .handler(async ctx => {
    const locale = await resolveLocaleServerFn()
    const messages = await getMessagesServerFn({ data: locale })
    const timeZone = 'UTC'

    setCookie('lng', locale, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    })

    return { locale, messages, timeZone }
  })

const supportedLanguages: Languages = ['en', 'zh']
const defaultLangauge = supportedLanguages[0]

const resolveLocaleServerFn = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .handler(ctx => {
    const headers = getRequestHeaders()
    const accpetLanguage = headers.get('accept-language') ?? defaultLangauge
    const locale = pick(supportedLanguages, accpetLanguage) ?? defaultLangauge
    return locale
  })

const getMessagesServerFn = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .inputValidator((data: Language) => data)
  .handler(async ctx => {
    return messages[ctx.data]
  })
