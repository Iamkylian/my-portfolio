import { test, expect } from '@playwright/test'
import {
  defaultLanguage,
  languages,
  languageFromPath,
  localizedPath,
  stripLanguage,
} from '../shared/languages'
import { translate, validateDictionary } from '../shared/translations'

test('language URL helpers preserve query and fragment and only match whole prefixes', () => {
  expect(languageFromPath('/enough/')).toBeUndefined()
  expect(languageFromPath('/projets/?next=/fr/')).toBeUndefined()
  expect(stripLanguage('/en?view=all#contact')).toBe('/?view=all#contact')
  for (const { code } of languages) {
    expect(localizedPath('/fr/projets/bastion/?view=all#main', code)).toBe(
      `/${code}/projets/bastion/?view=all#main`,
    )
    expect(localizedPath(`/${code}`, code)).toBe(`/${code}/`)
    expect(languageFromPath(`/${code}/projets/`)).toBe(code)
  }
  expect(localizedPath('/projets/')).toBe(`/${defaultLanguage}/projets/`)
})

test('missing or malformed translations fail clearly instead of leaking source content', () => {
  expect(() => validateDictionary(undefined, 'test')).toThrow('Invalid dictionary for test')
  expect(() => validateDictionary({ title: 42 }, 'test')).toThrow('Invalid dictionary for test')
  expect(() => translate('Un texte manquant', defaultLanguage, {})).toThrow('Missing')
  expect(() => translate('toString', defaultLanguage, { [defaultLanguage]: {} })).toThrow('Missing')
  expect(translate('2026', defaultLanguage, {})).toBe('2026')
})
