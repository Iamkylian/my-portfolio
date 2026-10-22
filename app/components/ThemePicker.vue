<script setup lang="ts">
const { t } = useLanguage()
const preference = ref<'light' | 'dark'>('light')
const ready = ref(false)

function apply() {
  document.documentElement.dataset.theme = preference.value
}
function toggle() {
  preference.value = preference.value === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem('kg-theme', preference.value)
  } catch {
    /* Preference still works for this visit. */
  }
  apply()
}
function syncStorage(event: StorageEvent) {
  if (event.key !== 'kg-theme' && event.key !== null) return
  if (event.newValue !== 'light' && event.newValue !== 'dark') return
  preference.value = event.newValue
  apply()
}
onMounted(() => {
  preference.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  window.addEventListener('storage', syncStorage)
  ready.value = true
})
onBeforeUnmount(() => {
  window.removeEventListener('storage', syncStorage)
})
</script>

<template>
  <button
    type="button"
    class="theme-picker"
    :aria-label="t('Thème d’affichage')"
    :aria-pressed="preference === 'dark'"
    :title="t(preference === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre')"
    :disabled="!ready"
    @click="toggle"
  >
    <AppIcon
      :name="preference === 'dark' ? 'moon' : 'sun'"
      :size="18"
    />
  </button>
</template>
