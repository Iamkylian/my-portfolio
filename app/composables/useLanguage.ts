import {
  defaultLanguage,
  languages,
  languageFromPath,
  localizedPath,
  sourceLanguage,
  stripLanguage,
  type Language,
} from '#shared/languages'
import { translate, validateDictionary, type Dictionaries } from '#shared/translations'

// Vite discovers dictionary files; registering a language never requires another import.
const files = import.meta.glob('../locales/*.json', { eager: true, import: 'default' })
const dictionaries: Dictionaries = {}
for (const { code } of languages) {
  if (code !== sourceLanguage) {
    dictionaries[code] = validateDictionary(files[`../locales/${code}.json`], code)
  }
}

export function useLanguage() {
  const route = useRoute()
  const language = computed(() => languageFromPath(route.path) || defaultLanguage)
  const barePath = computed(() => stripLanguage(route.path))
  const t = (source: string) => translate(source, language.value, dictionaries)
  const localePath = (path: string, target: Language = language.value) =>
    localizedPath(path, target)
  return { language, barePath, t, localePath }
}
