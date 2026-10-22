<script setup lang="ts">
withDefaults(
  defineProps<{
    name?:
      | 'arrow'
      | 'external'
      | 'sun'
      | 'moon'
      | 'monitor'
      | 'github'
      | 'linkedin'
      | 'mail'
      | 'plus'
      | 'close'
      | 'menu'
    size?: number
  }>(),
  { name: 'arrow', size: 20 },
)
const paths = {
  arrow: 'M4 12h15M13 5l7 7-7 7',
  external: 'M7 17 17 7M6 7h11v11',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z',
  monitor: 'M3 4h18v13H3ZM8 21h8m-4-4v4',
  github:
    'M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.5c3.5-.4 7-1.7 7-7A5.4 5.4 0 0 0 19.5 5 5 5 0 0 0 19.3 1S18 1 15 2.7a13.4 13.4 0 0 0-6 0C6 1 4.7 1 4.7 1A5 5 0 0 0 4.5 5 5.4 5.4 0 0 0 3 8.5c0 5.3 3.5 6.6 7 7A3.5 3.5 0 0 0 9 18v4',
  linkedin: 'M5 9v11M5 4v.1M10 20V9h4v2c2-4 6-2 6 1v8m-6-6v6',
  mail: 'M3 5h18v14H3Zm0 0 9 8 9-8',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 8h16M4 16h16',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name]" />
  </svg>
</template>
