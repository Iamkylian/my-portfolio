import { defaultLanguage, languages, localizedPath } from './shared/languages'
import { siteSettings } from './shared/site'

const site = siteSettings()

export default defineNuxtConfig({
  hooks: {
    'pages:extend'(pages) {
      const localized = languages.flatMap(({ code: language }) =>
        pages.map((page) => ({
          ...page,
          name: `${page.name}-${language}`,
          path: `/${language}${page.path === '/' ? '/' : page.path}`,
        })),
      )
      pages.push(...localized)
    },
  },
  compatibilityDate: '2026-10-17',
  devtools: { enabled: false },
  telemetry: false,
  ssr: true,
  css: ['~/assets/css/main.css'],
  sourcemap: { server: false, client: false },
  typescript: { strict: true },
  app: {
    baseURL: site.base,
    head: {
      htmlAttrs: { lang: defaultLanguage },
      meta: [{ name: 'color-scheme', content: 'light dark' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${site.base}favicon.svg` }],
      script: [{ src: `${site.base}theme.js`, tagPosition: 'head', tagPriority: 'critical' }],
    },
  },
  runtimeConfig: { public: { siteUrl: site.url } },
  features: { inlineStyles: false },
  experimental: { appManifest: false, payloadExtraction: true },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: languages.map(({ code }) => localizedPath('/', code)),
    },
  },
})
