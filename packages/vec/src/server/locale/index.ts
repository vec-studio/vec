import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders, setCookie } from '@tanstack/react-start/server'
import consola from 'consola'
import { contextMiddleware } from '../../middleware'
import { type Locale, type Locales, type Messages } from './messages'
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

const supportedLanguages: Locales = ['en', 'zh']
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
  .inputValidator((data: Locale) => data)
  .handler(async ctx => {
    try {
      const module = await import(`~/messages/${ctx.data}.json`)
      const response = new Response(JSON.stringify(module?.default ?? {}))
      const messages = await response.json()
      return messages as Messages
    } catch (e) {
      consola.error(e)
      return {}
    }
  })
