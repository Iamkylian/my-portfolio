import {
  defaultLanguage,
  languages,
  getLanguage,
  socialImageFor,
  type Language,
} from '#shared/languages'

export function usePageSeo(title: string, description: string, path: string) {
  const config = useRuntimeConfig()
  const { language, t, localePath } = useLanguage()
  const absolute = (target: Language) =>
    new URL(localePath(path, target).slice(1), config.public.siteUrl).href
  const canonical = computed(() => absolute(language.value))
  const image = computed(() => new URL(socialImageFor(language.value), config.public.siteUrl).href)
  useSeoMeta({
    title: () => `${t(title)} — Kylian Gachet`,
    description: () => t(description),
    ogTitle: () => `${t(title)} — Kylian Gachet`,
    ogDescription: () => t(description),
    ogType: 'website',
    ogLocale: () => getLanguage(language.value).locale,
    ogSiteName: 'Kylian Gachet',
    ogUrl: () => canonical.value,
    ogImage: () => image.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => t('Kylian Gachet — Cybersécurité et réseaux'),
    twitterCard: 'summary_large_image',
  })
  useHead(() => ({
    htmlAttrs: { lang: language.value },
    link: [
      { rel: 'canonical', href: canonical.value },
      ...languages.map(({ code }) => ({
        rel: 'alternate' as const,
        hreflang: code,
        href: absolute(code),
      })),
      { rel: 'alternate', hreflang: 'x-default', href: absolute(defaultLanguage) },
    ],
  }))
}
