import {
  defaultLanguage,
  sourceLanguage,
  languages,
  languageFromPath,
  localizedPath,
  stripLanguage,
} from '../shared/languages.ts'
import { translateFor } from './translations.mjs'
import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { siteSettings } from '../shared/site.ts'

const root = '.output/public'
const site = siteSettings()
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? files(join(dir, entry.name)) : join(dir, entry.name),
      ),
    )
  ).flat()
}

const home = await readFile(join(root, defaultLanguage, 'index.html'), 'utf8')
const cssLinks = [...home.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]
  .map((match) => match[0])
  .join('')
const document = (title, body, canonical, language = defaultLanguage) =>
  `<!DOCTYPE html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta name="color-scheme" content="light dark"><title>${title} — Kylian Gachet</title><link rel="icon" href="${site.base}favicon.svg">${canonical ? `<link rel="canonical" href="${escape(canonical)}">` : ''}<script src="${site.base}theme.js"></script>${cssLinks}</head><body><main class="container error-page">${body}</main></body></html>`
const t = (source) => translateFor(source, defaultLanguage)
const homeLinks = languages
  .map(
    ({ code }) =>
      `<p lang="${code}"><a class="${code === defaultLanguage ? 'button button-primary' : 'text-link'}" href="${site.base}${code}/">${escape(translateFor('Retour à l’accueil', code))} →</a></p>`,
  )
  .join('')
await writeFile(
  join(root, '404.html'),
  document(
    t('Page introuvable'),
    `<p class="eyebrow">${escape(t('404 / PAGE INTROUVABLE'))}</p><h1>${escape(t('Cette connexion n’aboutit pas.'))}</h1><p>${escape(t('La page a peut-être changé d’adresse. Les projets et le parcours sont toujours à découvrir.'))}</p>${homeLinks}`,
  ),
)
await rm(join(root, '200.html'), { force: true })

// Preserve old project addresses with an explicit link; these are not HTTP redirects.
const legacy = {
  'memoire-rag-application': 'rag-documentaire',
  'roomservice-gestion-salles': 'roomservice',
  'exploitation-bases-donnees-beachaffairs': 'beachaffairs',
  'site-portfolio': '',
  'amelioration-rag': '',
  'anime-face-recognition': '',
  'apprentissage-outils-ia': '',
  'slave-narratives': 'slave-narratives',
  'environnement-developpement-ubuntu': 'environnement-linux',
  'suivi-entrainements-sportifs-coaching': 'coaching-sportif',
  'automatisation-cicd': 'integration-continue',
  'optimisation-algorithmes-pathfinding': '',
}
for (const [old, next] of Object.entries(legacy)) {
  const target = `${sourceLanguage}/projets/${next ? `${next}/` : ''}`
  const html = document(
    'Le portfolio a évolué',
    `<p class="eyebrow">UNE NOUVELLE ADRESSE</p><h1>Le portfolio a évolué.</h1><p>Retrouvez les projets dans leur nouvelle présentation.</p><a class="button button-primary" href="${site.base}${target}">Découvrir les projets →</a>`,
    new URL(target, site.url).href,
    sourceLanguage,
  )
  await mkdir(join(root, 'projects', old), { recursive: true })
  await writeFile(join(root, 'projects', old, 'index.html'), html)
  await writeFile(join(root, 'projects', `${old}.html`), html)
}

// Explicit language URLs, with HTTP rules and a fallback for static hosts without redirects.
const defaultPages = (await files(join(root, defaultLanguage))).filter((file) =>
  file.endsWith('/index.html'),
)
const redirects = []
for (const file of defaultPages) {
  const suffix = file.slice(join(root, defaultLanguage).length + 1).replace(/index\.html$/, '')
  const target = `${site.base}${defaultLanguage}/${suffix}`
  const source = `${site.base}${suffix}`
  redirects.push(`${source} ${target} 301`)
  if (suffix) redirects.push(`${source.slice(0, -1)} ${target} 301`)
  const html = document(
    t('Redirection'),
    `<h1>${escape(t('Redirection'))}</h1><a id="language-redirect" class="button button-primary" href="${escape(target)}">${escape(t('Retour à l’accueil'))} →</a><script src="${site.base}language-redirect.js"></script>`,
    new URL(`${defaultLanguage}/${suffix}`, site.url).href,
  ).replace(
    '</head>',
    `<noscript><meta http-equiv="refresh" content="0;url=${escape(target)}"></noscript></head>`,
  )
  const folder = join(root, suffix)
  await mkdir(folder, { recursive: true })
  await writeFile(join(folder, 'index.html'), html)
}
await writeFile(join(root, '_redirects'), `${redirects.join('\n')}\n`)

const output = await files(root)
const htmlFiles = output.filter((file) => file.endsWith('.html'))
const scriptHashes = new Set()
const styleHashes = new Set()
const hash = (text) => `'sha256-${createHash('sha256').update(text).digest('base64')}'`
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (
      !/\bsrc=/.test(match[1]) &&
      !/type="application\/(?:json|ld\+json)"/.test(match[1]) &&
      match[2]
    )
      scriptHashes.add(hash(match[2]))
  }
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g))
    styleHashes.add(hash(match[1]))
  if (/\s(?:on\w+|style)=/i.test(html))
    throw new Error(`Unexpected inline handler or style in ${file}`)
}
const csp = [
  "default-src 'none'",
  `script-src 'self' ${[...scriptHashes].join(' ')}`.trim(),
  "script-src-attr 'none'",
  `style-src 'self' ${[...styleHashes].join(' ')}`.trim(),
  "style-src-attr 'none'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
].join('; ')
if (csp.length > 1900)
  throw new Error('CSP is too large for the hosting header limit; inspect inline scripts.')
const headers = `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
${site.base}_nuxt/*
  Cache-Control: public, max-age=31536000, immutable
`
await writeFile(join(root, '_headers'), headers)
// GitHub Pages ignores _headers: this fallback cannot enforce frame-ancestors.
const metaCsp = csp
  .split('; ')
  .filter((rule) => !rule.startsWith('frame-ancestors'))
  .join('; ')
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  await writeFile(
    file,
    html.replace(
      '<head>',
      `<head><meta http-equiv="Content-Security-Policy" content="${escape(metaCsp)}"><meta name="referrer" content="no-referrer">`,
    ),
  )
}
const routes = htmlFiles
  .filter(
    (file) =>
      languageFromPath(file.slice(root.length)) !== undefined && file.endsWith('/index.html'),
  )
  .map((file) => file.slice(root.length + 1).replace(/index\.html$/, ''))
await writeFile(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes
    .map((route) => {
      const plain = stripLanguage(`/${route}`).slice(1)
      const alternate = [...languages.map(({ code }) => code), 'x-default']
        .map(
          (language) =>
            `<xhtml:link rel="alternate" hreflang="${language}" href="${escape(new URL(localizedPath(`/${plain}`, language === 'x-default' ? defaultLanguage : language).slice(1), site.url).href)}"/>`,
        )
        .join('')
      return `<url><loc>${escape(new URL(route, site.url).href)}</loc>${alternate}</url>`
    })
    .join('')}</urlset>\n`,
)
await writeFile(
  join(root, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`,
)
await writeFile(join(root, '.nojekyll'), '')
console.log(
  `Finalized ${htmlFiles.length} HTML files, ${routes.length} sitemap URLs. CSP: ${csp.length} characters; ${scriptHashes.size} script hashes.`,
)
