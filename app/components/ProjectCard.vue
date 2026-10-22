<script setup lang="ts">
const { t, localePath } = useLanguage()
import type { Project } from '~/types/content'
defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article
    class="project-card"
    :class="{ 'project-featured': featured }"
  >
    <NuxtLink
      :to="localePath(`/projets/${project.slug}/`)"
      class="project-visual-link"
      tabindex="-1"
      aria-hidden="true"
    >
      <ProjectArt :variant="project.visual" />
    </NuxtLink>
    <div class="project-card-content">
      <div class="project-meta">
        <span>{{ t(project.category) }}</span>
        <span>{{ t(project.year) }}</span>
      </div>
      <h3>
        <NuxtLink :to="localePath(`/projets/${project.slug}/`)">
          {{ t(project.title) }}
          <AppIcon
            name="external"
            :size="24"
          />
        </NuxtLink>
      </h3>
      <p>{{ t(project.description) }}</p>
      <ul
        class="tags"
        :aria-label="t('Technologies et domaines')"
      >
        <li
          v-for="tag in project.tags.slice(0, 3)"
          :key="tag"
        >
          {{ t(tag) }}
        </li>
      </ul>
    </div>
  </article>
</template>
