/** Add languages here, then provide app/locales/<code>.json for non-source languages. */
export const languages = [
  {
    code: 'en',
    label: 'English',
    locale: 'en_GB',
    switchLabel: 'Switch to English',
    socialImage: 'social-card.png',
  },
  {
    code: 'fr',
    label: 'Français',
    locale: 'fr_FR',
    switchLabel: 'Passer en français',
    socialImage: 'social-card-fr.png',
  },
] as const satisfies readonly LanguageDefinition[]

export interface LanguageDefinition {
  code: string
  label: string
  locale: string
  switchLabel: string
  /** Optional: omit to reuse the default language’s sharing image. */
  socialImage?: string
}

export type Language = (typeof languages)[number]['code']
export const defaultLanguage: Language = 'en'
/** Content in components and data files is authored in this language. */
export const sourceLanguage: Language = 'fr'

const definitions: readonly LanguageDefinition[] = languages
const codes = new Set(definitions.map(({ code }) => code))
if (
  codes.size !== definitions.length ||
  definitions.some(({ code }) => !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(code))
) {
  throw new Error('Language codes must be unique and safe URL segments, such as en or pt-BR.')
}
if (!codes.has(defaultLanguage) || !codes.has(sourceLanguage)) {
  throw new Error('Default and source languages must be registered.')
}

export function isLanguage(value: string): value is Language {
  return codes.has(value)
}

export function getLanguage(code: Language): LanguageDefinition {
  return definitions.find((language) => language.code === code)!
}

/** Only inspect the first URL segment, never a query parameter or fragment. */
export function languageFromPath(path: string): Language | undefined {
  const code = path.split(/[/?#]/)[1] || ''
  return isLanguage(code) ? code : undefined
}

export function stripLanguage(path: string): string {
  const code = languageFromPath(path)
  const stripped = code ? path.slice(code.length + 1) : path
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}

export function localizedPath(path: string, language: Language = defaultLanguage): string {
  return `/${language}${stripLanguage(path)}`
}

export function socialImageFor(code: Language): string {
  return (
    getLanguage(code).socialImage || getLanguage(defaultLanguage).socialImage || 'social-card.png'
  )
}
