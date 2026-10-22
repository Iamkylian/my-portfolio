<script setup lang="ts">
const { t, localePath } = useLanguage()
import { projects } from '~/data/projects'
const filters = [
  'Tous',
  'Cybersécurité & réseaux',
  'Développement & données',
  'Systèmes & qualité',
] as const
const active = ref<(typeof filters)[number]>('Tous')
const filtered = computed(() =>
  projects.filter((project) => active.value === 'Tous' || project.category === active.value),
)
usePageSeo(
  'Projets',
  'Découvrez les projets de Kylian Gachet : communications spatiales, MQTT, RAG documentaire, développement web, Linux et intégration continue.',
  '/projets/',
)
</script>

<template>
  <div class="container page-content">
    <header class="page-intro">
      <p class="eyebrow">{{ t('PROJETS') }}</p>
      <h1>{{ t('Mes projets') }}</h1>
      <p>
        {{
          t(
            'Voici les projets sur lesquels j’ai travaillé pendant mes études, seul ou en équipe. Les fiches présentent leur objectif et les outils utilisés.',
          )
        }}
      </p>
    </header>
    <div
      class="project-filters"
      role="group"
      :aria-label="t('Filtrer les projets par domaine')"
    >
      <button
        v-for="filter in filters"
        :key="filter"
        :aria-pressed="active === filter"
        @click="active = filter"
      >
        {{ t(filter) }}
        <span
          v-if="filter === 'Tous'"
          class="filter-count"
        >
          {{ projects.length }}
        </span>
      </button>
    </div>
    <p
      class="results-count"
      role="status"
    >
      {{ filtered.length }} {{ t(filtered.length === 1 ? 'projet' : 'projets') }}
    </p>
    <div class="catalog-grid">
      <ProjectCard
        v-for="project in filtered"
        :key="project.slug"
        :project="project"
      />
    </div>
    <div class="page-end">
      <p>{{ t('Envie d’en savoir plus sur un projet ?') }}</p>
      <NuxtLink
        class="text-link"
        :to="localePath('/#contact')"
      >
        {{ t('Me contacter') }}
        <AppIcon name="arrow" />
      </NuxtLink>
    </div>
  </div>
</template>
