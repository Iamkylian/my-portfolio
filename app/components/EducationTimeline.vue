<script setup lang="ts">
const { t } = useLanguage()
import { education } from '~/data/profile'
const props = defineProps<{ limit?: number }>()
const steps = computed(() => (props.limit ? education.slice(0, props.limit) : education))
</script>

<template>
  <ol class="timeline">
    <li
      v-for="step in steps"
      :key="step.title"
      :class="{ current: step.current }"
    >
      <span
        class="timeline-dot"
        aria-hidden="true"
      ></span>
      <div class="timeline-date">
        {{ t(step.date) }}
        <span
          v-if="step.current"
          class="current-label"
        >
          {{ t('En cours') }}
        </span>
      </div>
      <h3>{{ t(step.title) }}</h3>
      <p class="timeline-place">{{ t(step.place) }}</p>
      <p>{{ t(step.text) }}</p>
    </li>
  </ol>
</template>
