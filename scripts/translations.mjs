import { readFile } from 'node:fs/promises'
import { languages, sourceLanguage } from '../shared/languages.ts'
import { translate, validateDictionary } from '../shared/translations.ts'

const dictionaries = Object.fromEntries(
  await Promise.all(
    languages
      .filter(({ code }) => code !== sourceLanguage)
      .map(async ({ code }) => [
        code,
        validateDictionary(
          JSON.parse(
            await readFile(new URL(`../app/locales/${code}.json`, import.meta.url), 'utf8'),
          ),
          code,
        ),
      ]),
  ),
)

export const translateFor = (source, language) => translate(source, language, dictionaries)
