/** One URL controls the canonical origin AND the hosting subdirectory. */
export function siteSettings(raw = process.env.SITE_URL || 'https://iamkylian.github.io/') {
  const url = new URL(raw)
  if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be a public HTTPS URL without credentials, query or fragment.')
  }
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/`
  return { url: url.href, base: url.pathname }
}
