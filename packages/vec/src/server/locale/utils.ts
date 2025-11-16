import lodash from 'lodash'
import { Locales } from './messages'

// https://github.com/opentable/accept-language-parser/blob/master/index.js

export function parse(s: string) {
  const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g

  const a1 = (s || '').match(regex) ?? []

  const a2 = a1.map(m => {
    if (!m) return

    const bits = m.split(';')
    const ietf = bits[0].split('-')
    const hasScript = ietf.length === 3

    const o = {
      code: ietf[0],
      script: hasScript ? ietf[1] : null,
      region: hasScript ? ietf[2] : ietf[1],
      quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0
    }

    return o
  })

  const a3 = lodash.filter(a2, o => !lodash.isNil(o))

  const a4 = a3.sort((a, b) => b.quality - a.quality)

  return a4
}

export function pick(supportedLanguages: Locales, acceptLanguage: string, options?: any) {
  options = options ?? {}

  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) return null

  const a1 = lodash.isString(acceptLanguage) ? parse(acceptLanguage) : []

  const a2 = supportedLanguages.map(supportedLanguage => {
    const a3 = supportedLanguage.split('-')
    const b = a3.length === 3

    return {
      code: a3[0],
      script: b ? a3[1] : null,
      region: b ? a3[2] : a3[1]
    }
  })

  a1.forEach((o1, i) => {
    const s1 = o1.code.toLowerCase()
    const s2 = o1.region?.toLowerCase() ?? o1.region
    const s3 = o1.script?.toLowerCase() ?? o1.script

    for (const o2 of a2) {
      const s4 = o2.code.toLowerCase()
      const s5 = o2.region?.toLowerCase() ?? o2.region
      const s6 = o2.script?.toLowerCase() ?? o2.script

      if (s1 === s4 && (options.loose || !s3 || s3 === s6) && (options.loose || !s2 || s2 === s5)) {
        return supportedLanguages[i]
      }
    }
  })

  return null
}
