import { createServerFn } from '@tanstack/react-start'
import { getEvent, getWebRequest } from '@tanstack/react-start/server'
import acceptLanguageParser from 'accept-language-parser'
import { contextMiddleware } from 'src/middleware'

const supportedLanguages = ['en', 'zh']
const defaultLangauge = supportedLanguages[0]

export const resolveLocale = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .handler(() => {
    const request = getWebRequest()!
    const accpetLanguage = request.headers.get('accept-language') ?? defaultLangauge
    const locale = acceptLanguageParser.pick(supportedLanguages, accpetLanguage) ?? defaultLangauge
    return locale
  })

export const getMessages = createServerFn({ method: 'GET' })
  .middleware([contextMiddleware])
  .validator((data: string) => data)
  .handler(async ctx => {
    const module = await import(`public/messages/${ctx.data}.json`)
    const response = new Response(JSON.stringify(module?.default ?? {}))
    const messages = await response.json()
    return messages
  })
