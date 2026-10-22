import { sourceLanguage, type Language } from './languages.ts'

export type Dictionary = Record<string, string>
export type Dictionaries = Partial<Record<Language, Dictionary>>

export function translate(source: string, language: Language, dictionaries: Dictionaries): string {
  if (language === sourceLanguage || !source || !/\p{L}/u.test(source)) return source
  const dictionary = dictionaries[language]
  const translation =
    dictionary && Object.hasOwn(dictionary, source) ? dictionary[source] : undefined
  if (translation === undefined) throw new Error(`Missing ${language} translation: ${source}`)
  return translation
}

export function validateDictionary(value: unknown, code: string): Dictionary {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    Object.values(value).some((entry) => typeof entry !== 'string')
  ) {
    throw new Error(`Invalid dictionary for ${code}: expected an object containing string values.`)
  }
  return value as Dictionary
}
