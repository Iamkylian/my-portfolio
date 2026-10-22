<script setup lang="ts">
const { t, localePath } = useLanguage()
import { projects } from '~/data/projects'
import { skills } from '~/data/profile'
const selected = projects.filter((project) => project.featured)
usePageSeo(
  'Cybersécurité & réseaux',
  'Kylian Gachet, étudiant en M1 Réseaux et Télécommunications à l’URCA, parcours Administration et Sécurité des Réseaux. Projets, compétences et parcours.',
  '/',
)
</script>

<template>
  <div class="home-page">
    <section
      class="hero container"
      aria-labelledby="hero-title"
    >
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">
          <span class="status-dot"></span>
          {{ t('MON PORTFOLIO') }}
        </p>
        <h1 id="hero-title">{{ t('Kylian Gachet') }}</h1>
        <p class="hero-role">
          {{ t('Étudiant en réseaux & cybersécurité') }}
        </p>
        <p class="hero-description">
          {{
            t(
              'Passionnée par les domaines de la cybersécurité et des réseaux, je me spécialise et développe continuellement mes compétences.',
            )
          }}
        </p>

        <div class="hero-actions">
          <NuxtLink
            class="button button-primary"
            :to="localePath('/projets/')"
          >
            {{ t('Voir mes projets') }}
            <AppIcon
              name="arrow"
              :size="18"
            />
          </NuxtLink>
          <a
            class="text-link"
            href="#contact"
          >
            {{ t('Me contacter') }}
            <AppIcon
              name="external"
              :size="18"
            />
          </a>
        </div>
      </div>
      <HeroIllustration />
      <div class="hero-bottom">
        <span class="mono">{{ t('RÉSEAUX · SYSTÈMES · DÉVELOPPEMENT') }}</span>
        <a href="#projets">
          {{ t('MES PROJETS') }}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
    <section
      id="projets"
      class="section projects-section container"
      aria-labelledby="projects-title"
    >
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            <span class="section-number">01</span>
            {{ t('PROJETS') }}
          </p>
          <h2 id="projects-title">{{ t('Quelques projets') }}</h2>
        </div>
        <NuxtLink
          class="text-link"
          :to="localePath('/projets/')"
        >
          {{ t('Tous les projets') }}
          <AppIcon
            name="arrow"
            :size="18"
          />
        </NuxtLink>
      </div>
      <div class="featured-grid">
        <ProjectCard
          v-for="(project, index) in selected"
          :key="project.slug"
          :project="project"
          :featured="index === 0"
        />
      </div>
    </section>
    <section
      id="competences"
      class="expertise-section section"
      aria-labelledby="expertise-title"
    >
      <div class="container expertise-grid">
        <div class="expertise-intro">
          <p class="eyebrow">
            <span class="section-number">02</span>
            {{ t('COMPÉTENCES') }}
          </p>
          <h2 id="expertise-title">{{ t('Ce que j’ai pratiqué') }}</h2>
          <p>
            {{
              t(
                'J’ai utilisé ces outils en cours, en projet ou pendant mon alternance. Je continue à me former en administration et en sécurité des réseaux.',
              )
            }}
          </p>
        </div>
        <div class="expertise-list">
          <article
            v-for="(skill, index) in skills"
            :key="skill.title"
          >
            <span class="expertise-index">0{{ index + 1 }} /</span>
            <div>
              <h3>{{ t(skill.title) }}</h3>
              <p>{{ t(skill.text) }}</p>
              <ul class="tags">
                <li
                  v-for="tag in skill.tags"
                  :key="tag"
                >
                  {{ t(tag) }}
                </li>
              </ul>
              <NuxtLink :to="localePath(`/projets/${skill.project}/`)">
                {{ t(skill.link) }}
                <AppIcon
                  name="external"
                  :size="16"
                />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section
      id="parcours"
      class="section container journey-section"
      aria-labelledby="journey-title"
    >
      <div class="journey-intro">
        <p class="eyebrow">
          <span class="section-number">03</span>
          {{ t('FORMATION') }}
        </p>
        <h2 id="journey-title">{{ t('Mon parcours') }}</h2>
        <p>
          {{
            t(
              'J’ai commencé par l’informatique à Blagnac, puis étudié les télécommunications à Talence. Je poursuis aujourd’hui mes études à Reims.',
            )
          }}
        </p>
        <NuxtLink
          class="text-link"
          :to="localePath('/parcours/')"
        >
          {{ t('Formation, expériences et centres d’intérêt') }}
          <AppIcon
            name="arrow"
            :size="18"
          />
        </NuxtLink>
      </div>
      <EducationTimeline :limit="3" />
    </section>
    <ContactSection />
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: clip;
}
.hero-bottom > span,
.hero-bottom > a {
  position: relative;
  z-index: 1;
  background: var(--background);
  box-shadow: 0 0 0 5px var(--background);
}
</style>
