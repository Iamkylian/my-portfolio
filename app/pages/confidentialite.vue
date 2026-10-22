<script setup lang="ts">
const { t } = useLanguage()
import { profile } from '~/data/profile'
usePageSeo(
  'Confidentialité',
  'Informations sur le fonctionnement du portfolio de Kylian Gachet, les préférences locales et les liens vers des services externes.',
  '/confidentialite/',
)
</script>

<template>
  <div class="container page-content privacy-page">
    <header class="page-intro">
      <p class="eyebrow">{{ t('INFORMATIONS DU SITE') }}</p>
      <h1>
        {{ t('Confidentialité') }}
        <span class="accent">.</span>
      </h1>
      <p>{{ t('Un portfolio personnel conçu pour limiter la collecte de données.') }}</p>
    </header>
    <div class="prose">
      <h2>{{ t('Éditeur et contact') }}</h2>
      <p>
        {{
          t(
            'Ce portfolio présente le parcours et les projets de Kylian Gachet. Pour une question relative au site :',
          )
        }}
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        .
      </p>
      <h2>{{ t('Navigation') }}</h2>
      <p>
        {{
          t(
            'Le site ne comporte ni compte utilisateur, ni formulaire de collecte, ni outil de mesure d’audience, ni publicité. Les polices et les illustrations sont hébergées avec le site.',
          )
        }}
      </p>
      <h2>{{ t('Préférence d’affichage') }}</h2>
      <p>
        {{
          t(
            'Votre choix de thème est enregistré dans le stockage local de votre navigateur, sous la clé',
          )
        }}
        <code>{{ t('kg-theme') }}</code>
        {{
          t(
            '. Cette préférence n’est pas transmise à un serveur. Vous pouvez la supprimer en effaçant les données de ce site dans votre navigateur.',
          )
        }}
      </p>
      <h2>{{ t('Langue du site') }}</h2>
      <p>
        {{
          t(
            'La langue est indiquée dans l’adresse de chaque page. L’adresse racine redirige vers la langue par défaut. Aucun cookie de langue n’est utilisé.',
          )
        }}
      </p>
      <h2>{{ t('Contact et liens externes') }}</h2>
      <p>
        {{
          t(
            'Le lien email ouvre votre application de messagerie. Les liens GitHub, LinkedIn et ceux des projets vous conduisent vers des services distincts, soumis à leurs propres conditions de confidentialité. Aucun widget social n’est intégré.',
          )
        }}
      </p>
      <h2>{{ t('Hébergement') }}</h2>
      <p>
        {{
          t(
            'L’hébergeur peut traiter des données techniques de connexion, comme l’adresse IP et les journaux de requêtes, pour assurer le fonctionnement et la sécurité du service. Ce traitement est distinct du fonctionnement applicatif de ce portfolio.',
          )
        }}
      </p>
      <h2>{{ t('Contenus des projets') }}</h2>
      <p>
        {{
          t(
            'Les schémas du site sont des illustrations de principes. Ils ne présentent ni configuration privée ni architecture interne d’entreprise. Les projets collectifs sont identifiés comme tels.',
          )
        }}
      </p>
    </div>
  </div>
</template>
