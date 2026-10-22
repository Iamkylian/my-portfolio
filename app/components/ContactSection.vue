<script setup lang="ts">
const { t } = useLanguage()
import { profile } from '~/data/profile'
const copied = ref(false)
const copyFailed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    copyFailed.value = false
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 3500)
  } catch {
    copied.value = false
    copyFailed.value = true
  }
}
onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <section
    id="contact"
    class="contact-section"
    aria-labelledby="contact-title"
  >
    <div class="container contact-inner">
      <div>
        <p class="eyebrow">
          <span class="section-number">04</span>
          {{ t('CONTACT') }}
        </p>
        <h2 id="contact-title">{{ t('Me contacter') }}</h2>
        <p class="contact-intro">
          {{ t('Vous pouvez m’écrire par email ou me retrouver sur LinkedIn et GitHub.') }}
        </p>
      </div>
      <div class="contact-details">
        <span class="eyebrow">{{ t('ÉCRIVEZ-MOI') }}</span>
        <a
          class="email-link"
          :href="`mailto:${profile.email}`"
        >
          {{ profile.email }}
          <AppIcon
            name="external"
            :size="25"
          />
        </a>
        <button
          class="copy-button"
          @click="copyEmail"
        >
          {{ t(copied ? 'Adresse copiée' : 'Copier l’adresse email') }}
          <AppIcon
            :name="copied ? 'mail' : 'plus'"
            :size="15"
          />
        </button>
        <p
          class="sr-only"
          role="status"
        >
          {{
            t(
              copied
                ? 'Adresse email copiée dans le presse-papiers.'
                : copyFailed
                  ? 'Copie indisponible. Cliquez sur l’adresse pour ouvrir votre messagerie.'
                  : '',
            )
          }}
        </p>
        <div class="social-links">
          <a :href="profile.linkedin">
            {{ t('LinkedIn') }}
            <AppIcon
              name="external"
              :size="16"
            />
          </a>
          <a :href="profile.github">
            {{ t('GitHub') }}
            <AppIcon
              name="external"
              :size="16"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
