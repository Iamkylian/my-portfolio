/** Local QA only: serves the exported files and the generated HTTP security policy. */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { siteSettings } from '../shared/site.ts'
import { gzipSync } from 'node:zlib'

const root = resolve('.output/public')
const { base } = siteSettings()
const port = Number(process.env.PORT || 4173)
const headerFile = await readFile(resolve(root, '_headers'), 'utf8')
const security = Object.fromEntries(
  headerFile
    .split('\n')
    .filter((line) => /^  (?!Cache-Control)/.test(line))
    .map((line) => {
      const split = line.indexOf(':')
      return [line.slice(2, split), line.slice(split + 1).trim()]
    }),
)
const redirects = new Map(
  (await readFile(resolve(root, '_redirects'), 'utf8'))
    .trim()
    .split('\n')
    .map((line) => {
      const [source, target] = line.split(/\s+/)
      return [source, target]
    }),
)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}
const server = createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' })
      response.end()
      return
    }
    const url = new URL(request.url || '/', 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    if (base !== '/' && pathname === base.slice(0, -1)) {
      response.writeHead(308, { Location: base })
      response.end()
      return
    }
    if (!pathname.startsWith(base)) {
      response.writeHead(404)
      response.end('Not found')
      return
    }
    const redirect = redirects.get(url.pathname)
    if (redirect) {
      response.writeHead(301, { Location: `${redirect}${url.search}` })
      response.end()
      return
    }
    const relative = pathname.slice(base.length)
    let file = resolve(root, relative || 'index.html')
    if (
      !file.startsWith(root + sep) ||
      relative.split('/').some((part) => part.startsWith('.') || part === '_headers')
    ) {
      response.writeHead(404)
      response.end('Not found')
      return
    }
    let code = 200
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(308, { Location: `${url.pathname}/${url.search}` })
          response.end()
          return
        }
        file = resolve(file, 'index.html')
      }
      await stat(file)
    } catch {
      file = resolve(root, '404.html')
      code = 404
    }
    const content = await readFile(file)
    const compress =
      /\bgzip\b/.test(request.headers['accept-encoding'] || '') &&
      /\.(?:html|js|css|json|svg|xml|txt)$/.test(file)
    const body = compress ? gzipSync(content) : content
    response.writeHead(code, {
      ...security,
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': relative.startsWith('_nuxt/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
      'Content-Length': body.length,
      Vary: 'Accept-Encoding',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
    })
    response.end(request.method === 'HEAD' ? undefined : body)
  } catch {
    response.writeHead(400)
    response.end('Bad request')
  }
})
server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}${base}`)
})
