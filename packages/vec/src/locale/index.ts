import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { contextMiddleware } from 'src/middleware'
import { pick as pickLanguage } from 'src/utils'

const supportedLanguages = ['en', 'zh']
const defaultLangauge = supportedLanguages[0]

export const resolveLocale = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .handler(ctx => {
    const headers = getRequestHeaders()
    const accpetLanguage = headers.get('accept-language') ?? defaultLangauge
    const locale = pickLanguage(supportedLanguages, accpetLanguage) ?? defaultLangauge
    return locale
  })

export const getMessages = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .inputValidator((data: string) => data)
  .handler(async ctx => {
    const module = await import(`public/messages/${ctx.data}.json`)
    const response = new Response(JSON.stringify(module?.default ?? {}))
    const messages = await response.json()
    return messages
  })
