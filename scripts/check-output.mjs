import {
  defaultLanguage,
  sourceLanguage,
  languages,
  languageFromPath,
} from '../shared/languages.ts'
import assert from 'node:assert/strict'
import { readdir, readFile, stat } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { siteSettings } from '../shared/site.ts'

const root = resolve('.output/public')
const site = siteSettings()
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name),
      ),
    )
  ).flat()
}
const files = await walk(root)
const pages = files.filter((file) => file.endsWith('.html'))
const errors = []
const titles = new Set()
const descriptions = new Set()
for (const file of pages) {
  const html = await readFile(file, 'utf8')
  const expectedLanguage = file.includes('/projects/')
    ? sourceLanguage
    : languageFromPath(file.slice(root.length)) || defaultLanguage
  if (!new RegExp(`<html\\b[^>]*lang="${expectedLanguage}"`).test(html))
    errors.push(`${file}: expected language ${expectedLanguage}`)
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${file}: expected one h1`)
  if (/unsafe-inline|unsafe-eval|\son\w+=|\sstyle=/i.test(html))
    errors.push(`${file}: unsafe inline code or policy`)
  if (!/http-equiv="Content-Security-Policy"/.test(html)) errors.push(`${file}: no fallback CSP`)
  const isLegacy = file.includes('/projects/')
  const isError = file.endsWith('/404.html')
  const isRedirect = html.includes('id="language-redirect"')
  if (!isLegacy && !isError && !isRedirect) {
    const title = html.match(/<title>(.*?)<\/title>/)?.[1]
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
    if (!title || titles.has(`${expectedLanguage}:${title}`))
      errors.push(`${file}: missing or duplicate title`)
    if (!description || descriptions.has(`${expectedLanguage}:${description}`))
      errors.push(`${file}: missing or duplicate description`)
    titles.add(`${expectedLanguage}:${title}`)
    descriptions.add(`${expectedLanguage}:${description}`)
    if (!html.includes('rel="canonical"')) errors.push(`${file}: missing canonical`)
    for (const language of [...languages.map(({ code }) => code), 'x-default']) {
      if (!html.includes(`hreflang="${language}"`))
        errors.push(`${file}: missing ${language} alternate`)
    }
  }
  const pageUrl = new URL(file.slice(root.length + 1).replace(/index\.html$/, ''), site.url)
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = match[1].replaceAll('&amp;', '&')
    if (/^(?:mailto:|tel:|data:)/.test(ref)) continue
    // Another public project shares github.io's origin, but is outside this export.
    if (ref === 'https://iamkylian.github.io/bastion-site/') continue
    const url = new URL(ref, pageUrl)
    if (url.origin !== new URL(site.url).origin) continue
    if (!url.pathname.startsWith(site.base)) {
      errors.push(`${file}: escapes base ${ref}`)
      continue
    }
    let target = resolve(
      root,
      decodeURIComponent(url.pathname.slice(site.base.length)) || 'index.html',
    )
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html')
      const targetContent = await readFile(target)
      if (
        url.hash &&
        target.endsWith('.html') &&
        !targetContent.toString().includes(`id="${url.hash.slice(1)}"`)
      )
        errors.push(`${file}: missing anchor ${ref}`)
    } catch {
      errors.push(`${file}: missing asset or page ${ref}`)
    }
  }
}
for (const file of files) {
  if (/\.(?:map|pem|key)$|\/(?:\.env|package\.json|package-lock\.json)$/.test(file))
    errors.push(`Unexpected public file: ${file}`)
}
const policy = await readFile(join(root, '_headers'), 'utf8')
assert(policy.includes("frame-ancestors 'none'"))
assert(policy.includes('X-Content-Type-Options: nosniff'))
assert(!(await readdir(root)).includes('200.html'))
assert.equal(errors.length, 0, errors.join('\n'))
console.log(
  `Verified ${pages.length} HTML files, internal resources, anchors, unique metadata, CSP and output exclusions.`,
)
