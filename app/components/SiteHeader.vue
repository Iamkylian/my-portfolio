<script setup lang="ts">
const { t, localePath, barePath } = useLanguage()
const open = ref(false)
const toggle = useTemplateRef('toggle')
const navigation = useTemplateRef('navigation')
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    toggle.value?.focus()
  }
}
async function toggleMenu() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    navigation.value?.querySelector('a')?.focus()
  }
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeOnEscape))
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink
        class="wordmark"
        :to="localePath('/')"
      >
        <span
          class="monogram"
          aria-hidden="true"
        >
          {{ t('k') }}
          <span>.</span>
        </span>
        <span>
          {{ t('Kylian Gachet') }}
          <span class="wordmark-sub">{{ t('CYBERSÉCURITÉ & RÉSEAUX') }}</span>
        </span>
      </NuxtLink>
      <div class="header-actions">
        <nav
          id="navigation"
          ref="navigation"
          :aria-label="t('Navigation principale')"
          class="navigation"
          :class="{ 'is-open': open }"
        >
          <NuxtLink
            :to="localePath('/')"
            :aria-current="barePath === '/' && !route.hash ? 'page' : 'false'"
            @click="open = false"
          >
            {{ t('Accueil') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/projets/')"
            :aria-current="barePath.startsWith('/projets') ? 'page' : undefined"
          >
            {{ t('Projets') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/parcours/')">{{ t('Parcours') }}</NuxtLink>
          <NuxtLink
            :to="localePath('/#contact')"
            :aria-current="route.hash === '#contact' ? 'location' : 'false'"
          >
            {{ t('Contact') }}
            <AppIcon
              name="external"
              :size="15"
            />
          </NuxtLink>
        </nav>
        <LanguagePicker />
        <ThemePicker />
        <button
          ref="toggle"
          class="icon-button menu-toggle"
          :aria-expanded="open"
          aria-controls="navigation"
          :aria-label="t(open ? 'Fermer le menu' : 'Ouvrir le menu')"
          @click="toggleMenu"
        >
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
  </header>
</template>
