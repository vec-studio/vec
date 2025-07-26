import cookie from 'cookie'

export function setCookies(headers: Headers, cookies: { userid: string; email: string; jwt: string }) {
  const opts = {
    // 1 year. Note that it doesn't really matter what this is as the JWT has
    // its own, much shorter expiry above. It makes sense for it to be long
    // since by default better auth will extend its own session indefinitely
    // as long as you keep calling getSession().
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  }
  for (const [key, value] of Object.entries(cookies)) {
    headers.append('Set-Cookie', cookie.serialize(key, value, opts))
  }
}
