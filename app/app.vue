<script setup lang="ts">
const { t } = useLanguage()
import interSemibold from '~/assets/fonts/inter-latin-600.woff2?url'

function preventDrag(event: DragEvent) {
  event.preventDefault()
}
onMounted(() => document.addEventListener('dragstart', preventDrag))
onBeforeUnmount(() => document.removeEventListener('dragstart', preventDrag))

useHead({
  link: [
    {
      rel: 'preload',
      href: interSemibold,
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <a
    class="skip-link"
    href="#main"
  >
    {{ t('Aller au contenu') }}
  </a>
  <SiteHeader />
  <main
    id="main"
    tabindex="-1"
  >
    <NuxtPage :page-key="(route) => route.path" />
  </main>
  <SiteFooter />
</template>
