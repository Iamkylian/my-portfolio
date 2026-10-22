<script setup lang="ts">
const { t, language, localePath } = useLanguage()
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useSeoMeta({ title: () => `${t('Page introuvable')} — Kylian Gachet`, robots: 'noindex' })
useHead(() => ({ htmlAttrs: { lang: language.value } }))
</script>

<template>
  <div>
    <SiteHeader />
    <main
      id="main"
      class="container error-page"
    >
      <p class="eyebrow">{{ t(is404 ? '404 / PAGE INTROUVABLE' : 'UNE ERREUR EST SURVENUE') }}</p>
      <h1>{{ t(is404 ? 'Cette connexion n’aboutit pas.' : 'Reprenons depuis l’accueil.') }}</h1>
      <p>
        {{
          t(
            is404
              ? 'La page a peut-être changé d’adresse. Les projets et le parcours sont toujours à découvrir.'
              : 'Vous pouvez revenir à l’accueil et poursuivre votre visite.',
          )
        }}
      </p>
      <a
        class="button button-primary"
        :href="`${useRuntimeConfig().app.baseURL}${localePath('/').slice(1)}`"
      >
        {{ t('Retour à l’accueil') }}
        <AppIcon name="arrow" />
      </a>
    </main>
    <SiteFooter />
  </div>
</template>
