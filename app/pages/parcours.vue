<script setup lang="ts">
const { t, localePath } = useLanguage()
import { qualifications, interests } from '~/data/profile'
usePageSeo(
  'Parcours',
  'Formation à l’URCA, à l’ENSEIRB-MATMECA et à l’IUT de Blagnac, alternance chez Airbus, compétences et centres d’intérêt de Kylian Gachet.',
  '/parcours/',
)
</script>

<template>
  <div class="container page-content">
    <header class="page-intro">
      <p class="eyebrow">{{ t('À PROPOS') }}</p>
      <h1>{{ t('Mon parcours') }}</h1>
      <p>
        {{
          t(
            'Je suis étudiant en M1 Réseaux et Télécommunications à l’URCA, à Reims. Je m’intéresse surtout à l’administration Linux, aux réseaux et à la cybersécurité, tout en continuant à développer.',
          )
        }}
      </p>
    </header>
    <section
      class="journey-section section-compact"
      aria-labelledby="education-title"
    >
      <div>
        <p class="eyebrow">{{ t('01 / ÉTUDES') }}</p>
        <h2 id="education-title">{{ t('Formation') }}</h2>
        <p class="section-description">
          {{
            t(
              'Après mon BUT Informatique et une année en télécommunications à l’ENSEIRB-MATMECA, j’ai rejoint le parcours Administration et Sécurité des Réseaux du master à Reims.',
            )
          }}
        </p>
      </div>
      <EducationTimeline />
    </section>
    <section
      class="experience-section section-compact"
      aria-labelledby="experience-title"
    >
      <div>
        <p class="eyebrow">{{ t('02 / EXPÉRIENCES') }}</p>
        <h2 id="experience-title">{{ t('Chez Airbus') }}</h2>
        <p class="section-description">
          {{
            t(
              'J’ai effectué deux années d’alternance à Blagnac pendant mon BUT. Mon poste de Data Analyst comprenait aussi du développement et des missions liées à la sécurité des échanges entre applications.',
            )
          }}
        </p>
      </div>
      <article class="experience-card">
        <div class="project-meta">
          <span>{{ t('SEPT. 2023 — JUIN 2025') }}</span>
          <span>{{ t('ALTERNANCE') }}</span>
        </div>
        <h3>{{ t('Data Analyst / Développeur') }}</h3>
        <ul class="experience-points">
          <li>
            {{
              t(
                'Développement d’un outil interne d’approbation d’offres commerciales avec Google Apps Script, AppSheet et des API REST.',
              )
            }}
          </li>
          <li>
            {{
              t(
                'Mise en place de flux ETL et préparation d’indicateurs métier avec SQL, Python et Spark.',
              )
            }}
          </li>
          <li>
            {{
              t(
                'Participation à une architecture d’authentification entre applications utilisant OAuth 2.0, des certificats clients PKI et une API Gateway.',
              )
            }}
          </li>
          <li>
            {{
              t(
                'Expérimentation de pipelines RAG avec des modèles locaux, via Ollama et LM Studio.',
              )
            }}
          </li>
          <li>
            {{
              t(
                'Documentation et travail avec les équipes dans un environnement soumis à des contraintes de confidentialité et de qualité de service.',
              )
            }}
          </li>
        </ul>
        <ul class="tags">
          <li>{{ t('Python') }}</li>
          <li>{{ t('SQL / Spark') }}</li>
          <li>{{ t('OAuth 2.0 / PKI') }}</li>
          <li>{{ t('API REST') }}</li>
        </ul>
      </article>
    </section>
    <section
      class="experience-section section-compact"
      aria-labelledby="netto-title"
    >
      <div>
        <h2 id="netto-title">{{ t('Autres expériences') }}</h2>
      </div>
      <article>
        <p class="eyebrow">{{ t('ÉTÉ 2022 ET JUILLET 2023 · NETTO, CESTAS') }}</p>
        <h3>{{ t('Employé polyvalent') }}</h3>
        <p class="section-description">
          {{
            t('Mise en rayon, encaissement, gestion des stocks, entretien et accueil des clients.')
          }}
        </p>
      </article>
    </section>
    <section
      class="section-compact qualifications"
      aria-labelledby="qualifications-title"
    >
      <p class="eyebrow">{{ t('03 / CERTIFICATIONS ET PERMIS') }}</p>
      <h2 id="qualifications-title">{{ t('Certifications, formations et permis') }}</h2>
      <div class="qualification-grid">
        <article
          v-for="item in qualifications"
          :key="item.title"
        >
          <span class="mono muted">{{ t(item.year) }}</span>
          <h3>{{ t(item.title) }}</h3>
          <span class="qualification-org">{{ t(item.organization) }}</span>
          <p>{{ t(item.detail) }}</p>
        </article>
      </div>
      <div class="language-note">
        <h3>{{ t('Langues') }}</h3>
        <p>
          {{
            t(
              'Anglais technique et professionnel (B2, TOEIC 830/990 en 2024). Japonais et allemand : débutant (A1).',
            )
          }}
        </p>
      </div>
    </section>
    <section
      class="section-compact"
      aria-labelledby="interests-title"
    >
      <p class="eyebrow">{{ t('04 / EN DEHORS DES COURS') }}</p>
      <h2 id="interests-title">{{ t('Mes centres d’intérêt') }}</h2>
      <div class="interest-grid">
        <article
          v-for="interest in interests"
          :key="interest.title"
        >
          <h3>{{ t(interest.title) }}</h3>
          <p>{{ t(interest.text) }}</p>
        </article>
      </div>
    </section>
    <div class="page-end">
      <p>{{ t('Les projets réalisés pendant mes études sont aussi sur ce site.') }}</p>
      <NuxtLink
        class="text-link"
        :to="localePath('/projets/')"
      >
        {{ t('Voir mes projets') }}
        <AppIcon name="arrow" />
      </NuxtLink>
    </div>
  </div>
</template>
