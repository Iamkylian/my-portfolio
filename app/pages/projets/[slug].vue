<script setup lang="ts">
const { t, localePath } = useLanguage()
import { projects } from '~/data/projects'
const route = useRoute()
const project = projects.find((project) => project.slug === route.params.slug)
if (!project) throw createError({ statusCode: 404, statusMessage: t('Projet introuvable') })
const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2)
usePageSeo(project.title, project.description, `/projets/${project.slug}/`)
</script>

<template>
  <div
    v-if="project"
    class="container page-content project-detail"
  >
    <NuxtLink
      class="back-link"
      :to="localePath('/projets/')"
    >
      <span aria-hidden="true">←</span>
      {{ t('Tous les projets') }}
    </NuxtLink>
    <header class="project-detail-header">
      <p class="eyebrow">
        {{ t(project.category) }}
        <span class="meta-separator">/</span>
        {{ t(project.year) }}
      </p>
      <h1>
        {{ t(project.title) }}
      </h1>
      <p class="project-subtitle">{{ t(project.subtitle) }}</p>
      <ul class="tags">
        <li
          v-for="tag in project.tags"
          :key="tag"
        >
          {{ t(tag) }}
        </li>
      </ul>
    </header>
    <ProjectArt :variant="project.visual" />
    <div class="project-body">
      <aside>
        <span class="eyebrow">{{ t('CONTEXTE') }}</span>
        <p>{{ t(project.context) }}</p>
        <span class="eyebrow">{{ t('ANNÉE') }}</span>
        <p>{{ t(project.year) }}</p>
        <a
          v-if="project.link"
          class="text-link"
          :href="project.link.url"
        >
          {{ t(project.link.label) }}
          <AppIcon
            name="external"
            :size="18"
          />
        </a>
      </aside>
      <div class="project-prose">
        <section>
          <h2>{{ t('Le projet') }}</h2>
          <p>{{ t(project.overview) }}</p>
        </section>
        <section>
          <h2>{{ t('L’approche') }}</h2>
          <div
            v-for="(step, index) in project.approach"
            :key="step.title"
            class="approach-step"
          >
            <span class="mono">0{{ index + 1 }}</span>
            <div>
              <h3>{{ t(step.title) }}</h3>
              <p>{{ t(step.text) }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <section
      class="related-projects"
      aria-labelledby="related-title"
    >
      <div class="section-heading">
        <h2 id="related-title">{{ t('Autres projets') }}</h2>
        <NuxtLink
          class="text-link"
          :to="localePath('/projets/')"
        >
          {{ t('Tous les projets') }}
          <AppIcon name="arrow" />
        </NuxtLink>
      </div>
      <div class="catalog-grid">
        <ProjectCard
          v-for="item in related"
          :key="item.slug"
          :project="item"
        />
      </div>
    </section>
  </div>
</template>
