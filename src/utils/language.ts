// https://github.com/opentable/accept-language-parser/blob/master/index.js

export function parse(al) {
  const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g

  let strings = (al || '').match(regex)

  strings = strings.map(function (m) {
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

  strings = strings.filter(r => r)

  strings = strings.sort((a, b) => b.quality - a.quality)

  return strings
}

export function pick(supportedLanguages, acceptLanguage, options) {
  options = options ?? {}

  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) return null

  if (typeof acceptLanguage === 'string') {
    acceptLanguage = parse(acceptLanguage)
  }

  const supported = supportedLanguages.map(function (support) {
    const bits = support.split('-')
    const hasScript = bits.length === 3

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1]
    }
  })

  for (let i = 0; i < acceptLanguage.length; i++) {
    const lang = acceptLanguage[i]
    const langCode = lang.code.toLowerCase()
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script

    for (let j = 0; j < supported.length; j++) {
      const supportedCode = supported[j].code.toLowerCase()
      const supportedScript = supported[j].script ? supported[j].script.toLowerCase() : supported[j].script
      const supportedRegion = supported[j].region ? supported[j].region.toLowerCase() : supported[j].region

      if (
        langCode === supportedCode &&
        (options.loose || !langScript || langScript === supportedScript) &&
        (options.loose || !langRegion || langRegion === supportedRegion)
      ) {
        return supportedLanguages[j]
      }
    }
  }

  return null
}
