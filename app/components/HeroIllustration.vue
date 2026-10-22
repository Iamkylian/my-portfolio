<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <NetworkArt v-if="config.heroIllustration === 'network'" />
  <LandscapeArt v-else-if="config.heroIllustration === 'landscape'" />
  <LandscapeArtBis v-else-if="config.heroIllustration === 'landscape-bis'" />
</template>
