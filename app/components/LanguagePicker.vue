<script setup lang="ts">
import { languages } from '#shared/languages'
const { language, localePath, t } = useLanguage()
const route = useRoute()
const expanded = ref(false)
watch(
  () => route.fullPath,
  () => {
    expanded.value = false
  },
)
const manyLanguages = languages.length > 2
function closeMenu(event: KeyboardEvent) {
  expanded.value = false
  ;(event.currentTarget as HTMLElement).querySelector('summary')?.focus()
}
</script>

<template>
  <component
    :is="manyLanguages ? 'details' : 'div'"
    class="language-picker"
    :class="{ 'language-picker-menu': manyLanguages }"
    :open="manyLanguages ? expanded : undefined"
    :aria-label="t('Langue du site')"
    :role="manyLanguages ? undefined : 'group'"
    @keydown.esc="closeMenu"
  >
    <summary
      v-if="manyLanguages"
      @click.prevent="expanded = !expanded"
    >
      {{ language.toUpperCase() }}
      <span aria-hidden="true">▾</span>
    </summary>
    <div class="language-options">
      <template
        v-for="(option, index) in languages"
        :key="option.code"
      >
        <span
          v-if="index && !manyLanguages"
          class="language-divider"
          aria-hidden="true"
        >
          /
        </span>
        <NuxtLink
          :to="localePath(route.fullPath, option.code)"
          :lang="option.code"
          :hreflang="option.code"
          :aria-label="option.switchLabel"
          :aria-current="language === option.code ? 'true' : undefined"
          :class="{ 'language-active': language === option.code }"
          @click="expanded = false"
        >
          {{ manyLanguages ? option.label : option.code.toUpperCase() }}
        </NuxtLink>
      </template>
    </div>
  </component>
</template>
