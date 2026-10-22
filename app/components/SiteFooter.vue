<script setup lang="ts">
const { t, localePath } = useLanguage()
import { profile } from '~/data/profile'
</script>

<template>
  <footer class="site-footer container">
    <span>© {{ new Date().getUTCFullYear() }} {{ t('Kylian Gachet') }}</span>
    <span class="footer-note">{{ t('Portfolio professionnel. Conçu avec attention.') }}</span>
    <div>
      <NuxtLink :to="localePath('/confidentialite/')">{{ t('Confidentialité') }}</NuxtLink>
      <a
        :href="profile.github"
        :aria-label="t('Profil GitHub de Kylian Gachet')"
      >
        <AppIcon
          name="github"
          :size="18"
        />
      </a>
      <a
        :href="profile.linkedin"
        :aria-label="t('Profil LinkedIn de Kylian Gachet')"
      >
        <AppIcon
          name="linkedin"
          :size="18"
        />
      </a>
    </div>
  </footer>
</template>
