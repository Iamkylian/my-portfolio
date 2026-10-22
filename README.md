# Portfolio de Kylian Gachet

Portfolio bilingue anglais/français, avec **l’anglais par défaut**, développé avec **Nuxt 4, Vue 3 et TypeScript**, exporté en fichiers statiques. Thèmes clair/sombre avec un bouton de bascule, quatorze fiches projets, parcours, centres d’intérêt et contact par email. Aucun backend, compte utilisateur, tracker ou formulaire tiers.

## Démarrer

Avec NVM déjà installé :

```sh
nvm install
nvm use
npm ci
npm run dev
```

Ouvrir l’adresse locale indiquée par Nuxt (normalement `http://127.0.0.1:3000`). Node **24.22.0** est fixé dans `.nvmrc`. Une installation Node 24.13.1 ne suffit pas pour cette version de Nuxt. Aucune modification de l’installation NVM de l’utilisateur n’a été faite pendant le développement ; les vérifications ont utilisé un runtime temporaire dans `/tmp`.

## Générer et vérifier

```sh
npm run lint
npm run format:check
npm run typecheck
npm run generate
npm run check:output
npx playwright install chromium
npm test
npm run audit:review
```

`npm run generate` inclut le traitement final : CSP calculée à partir du HTML, en-têtes, page 404, anciennes adresses de projets, sitemap et robots.txt. Ne pas publier une sortie de `nuxt generate` brut sans ce traitement.

Pour examiner le build :

```sh
npm run preview
```

Le serveur local écoute sur `127.0.0.1:4173`, applique les en-têtes générés et compresse les ressources texte avec gzip. C’est un outil de vérification local, **pas un serveur à déployer**. Les hébergeurs statiques servent directement `.output/public`.

## Modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `app/data/profile.ts` | Contact, formation, compétences, certifications et centres d’intérêt |
| `app/data/projects.ts` | Fiches projets ; `featured: true` sélectionne les cartes de l’accueil |
| `app/pages/index.vue` | Présentation personnelle |
| `app/pages/parcours.vue` | Expériences, langues et parcours détaillé |
| `app/assets/css/main.css` | Tokens, thèmes, responsive et styles |
| `scripts/social-card.mjs` | Source de la carte de partage ; régénérer avec `node scripts/social-card.mjs` après modification |

Les schémas SVG sont des illustrations de principes. Les polices Inter sont locales ; leur licence est dans `app/assets/fonts/INTER-LICENSE.txt`. Les CV et lettres de candidature restent hors du dépôt et du site : leur contenu ciblé et leurs recherches de poste ne sont pas publiés. Les sources et décisions éditoriales sont consignées dans [l’inventaire](docs/INVENTAIRE.md).

Les curseurs SVG locaux dans `app/assets/cursors/` reprennent le motif de cible, avec variantes clair/sombre et interactive. Ils s’appliquent aux pointeurs précis avec survol. À la demande du propriétaire, la sélection du contenu et le glisser-déposer sont désactivés ; le bouton de copie de l’email reste disponible. Les SVG sont émis comme fichiers distincts pour respecter la CSP.

## Langues

L’anglais est servi sous `/en/` et le français sous `/fr/`. Chaque page et chaque fiche projet porte explicitement son préfixe de langue. La racine `/` et les anciennes URL sans langue redirigent vers leur équivalent sous `/en/`. Les chemins de contenu (`projets`, `parcours`, `confidentialite`) sont conservés. Le sélecteur **EN / FR** de l’en-tête change la langue de la page courante et conserve les paramètres et l’ancre pendant la navigation. La langue est portée par l’URL, sans cookie ni redirection liée à la langue du navigateur. Un accès à la racine affiche donc `/en/` dans la barre d’adresse.

Les deux versions sont pré-rendues et restent consultables, y compris le changement de langue, sans JavaScript. Les métadonnées comprennent la langue HTML, les liens `hreflang`, une URL canonique par version et des cartes de partage distinctes. La 404 statique est en anglais avec des liens vers les accueils `/en/` et `/fr/`.

Le fichier `_redirects` définit les redirections HTTP 301 pour les hébergeurs qui le prennent en charge et pour l’aperçu local. GitHub Pages utilise les pages de redirection HTML générées, avec un script local qui conserve les paramètres et l’ancre, et un rafraîchissement HTML de secours sans JavaScript. En développement Nuxt, un middleware assure la redirection. Les URL de redirection sont exclues du sitemap.

Les langues sont définies **une seule fois dans `shared/languages.ts`** : code, nom natif, locale Open Graph et libellé du sélecteur. Ce registre pilote les routes, les préfixes, le sélecteur, les liens de référencement, le sitemap, les redirections et les contrôles d’export. `defaultLanguage` choisit la langue d’arrivée et `sourceLanguage` indique la langue dans laquelle les contenus sont rédigés (français).

### Ajouter une langue

1. Ajouter une entrée à `languages` dans `shared/languages.ts`, par exemple :

   ```ts
   { code: 'es', label: 'Español', locale: 'es_ES', switchLabel: 'Cambiar a español' },
   ```

2. Créer `app/locales/es.json` en reprenant les clés françaises de `en.json`, puis traduire les valeurs en espagnol. Les dictionnaires sont découverts automatiquement : aucun import supplémentaire à écrire. Il n’y a pas de dictionnaire français car les textes sources sont déjà en français.
3. Exécuter les vérifications et relire le rendu :

   ```sh
   npm run lint
   npm run typecheck
   npm run generate
   npm run check:output
   npm test
   ```

Les routes `/es/…`, le choix « Español » et les alternates de référencement sont créés automatiquement. Avec plus de deux langues, le sélecteur devient un menu compact. Les dictionnaires absents ou mal formés, et les traductions manquantes lors du rendu, font échouer la génération.

L’image de partage de la langue par défaut est réutilisée si aucune image spécifique n’est déclarée. Pour une carte traduite, ajouter par exemple `socialImage: 'social-card-es.png'` à l’entrée espagnole, puis exécuter `node scripts/social-card.mjs` avant la génération (Chromium Playwright doit être installé). Les textes de ces cartes proviennent également du dictionnaire ; cela reste optionnel pour l’ajout d’une langue.

Les textes français restent dans les pages et les données. Après modification d’un texte source, mettre à jour la clé correspondante dans les dictionnaires. `useLanguage()` fournit toujours `t()` et `localePath()` ; il délègue aux fonctions partagées de configuration et de traduction.

Les tests couvrent le français et l’anglais, les fiches sans JavaScript, le changement de langue, le thème, les métadonnées, l’accessibilité, le responsive et les cas limites des préfixes d’URL.

## Choisir l’adresse de publication

Une seule variable, `SITE_URL`, détermine **le domaine canonique et le chemin de base**, y compris les assets. En local, la génération utilise `https://iamkylian.github.io/` par défaut. Sur GitHub Actions, le workflow de déploiement récupère automatiquement l’adresse configurée dans GitHub Pages.

Exemple local pour le dépôt actuel :

```sh
export SITE_URL=https://iamkylian.github.io/my-portfolio/
npm run generate
npm run check:output
npm test
npm run preview
```

Le site de test est alors sous `http://127.0.0.1:4173/my-portfolio/`. Pour un domaine dédié, utiliser sa racine. Garder la même variable pour la génération, les tests et l’aperçu.

Les anciennes URLs `/projects/<slug>/` et `/projects/<slug>.html` disposent de pages de compatibilité, à l’intérieur de la base choisie. Elles donnent un lien vers la nouvelle fiche ou le catalogue ; ce ne sont pas des redirections HTTP 301. Une migration de domaine ou de chemin nécessite aussi d’intervenir sur l’ancien hébergement pour préserver ses liens.

## Déploiement

### GitHub Pages : mise en place une seule fois

1. Dans [Settings → Pages](https://github.com/Iamkylian/my-portfolio/settings/pages), choisir **GitHub Actions** comme source dans **Build and deployment**. Vérifier « Enforce HTTPS » lorsqu’il est disponible.
2. Envoyer les fichiers du projet, dont `.github/workflows/pages.yml`, sur la branche **`main`** du dépôt. Le dossier `.output` est généré par le workflow et ne doit pas être ajouté au dépôt.
3. Dans l’onglet **Actions**, suivre **Deploy portfolio to GitHub Pages**. À la fin, le job `deploy` donne l’URL publiée.

Sans domaine personnalisé, l’adresse de ce dépôt sera **https://iamkylian.github.io/my-portfolio/**, qui ouvre `/en/`. La version française se trouve sous `/my-portfolio/fr/`.

### Mises à jour automatiques

Chaque push sur `main` déclenche l’installation reproductible (`npm ci`), les contrôles de code et de sécurité, la génération statique, la vérification des fichiers et les tests navigateur. Le déploiement ne démarre que si toutes ces étapes réussissent. Seul le contenu de `.output/public` est publié ; la version en ligne reste inchangée si la validation échoue.

Le workflow récupère l’URL réelle via `actions/configure-pages` et l’utilise pour les liens, les langues, les images, le sitemap et les URL canoniques. **Aucun secret personnel ni variable `PORTFOLIO_SITE_URL` n’est nécessaire.** Pour un domaine personnalisé, le configurer dans Settings → Pages puis relancer le workflow : la génération utilisera cette adresse.

Pour relancer sans nouveau commit : **Actions → Deploy portfolio to GitHub Pages → Run workflow → main**. Un lancement depuis une autre branche ne publie pas. Les déploiements sont sérialisés pour éviter deux publications simultanées.

Les pull requests sont contrôlées par `ci.yml`, à la racine et dans un sous-chemin, sans publication. Les actions sont épinglées à des SHA et suivies par Dependabot. Le job `build` n’a que les droits de lecture ; seul `deploy` dispose de `pages: write` et `id-token: write`, dans l’environnement `github-pages`.

Si le premier lancement échoue sur « Read GitHub Pages configuration », vérifier que Pages est bien activé avec la source **GitHub Actions**. Si le déploiement attend une approbation, vérifier les règles de l’environnement `github-pages` ; autoriser `main` pour la publication. Les erreurs de validation se consultent dans l’étape correspondante, notamment `audit:review` si une revue de sécurité doit être renouvelée.

Référence : [workflows personnalisés GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

GitHub Pages ignore `_headers`. La CSP en balise HTML protège les chargements et scripts, mais **ne fournit pas la protection anti-frame ni tous les en-têtes HTTP**. Les fichiers `robots.txt` d’un site de projet ne contrôlent pas les règles du domaine racine ; le sitemap peut être déclaré séparément aux moteurs.

### Cloudflare Pages, option recommandée pour les en-têtes

Créer un projet statique sans Functions, renseigner `SITE_URL` avec son adresse finale, fixer Node 24.22.0, utiliser `npm ci && npm run generate && npm run check:output`, puis publier `.output/public`. Le fichier `_headers` généré applique la CSP HTTP, l’anti-framing, `nosniff`, la politique de référent, Permissions-Policy et HSTS. HSTS concerne uniquement le domaine, sans `includeSubDomains` ni preload.

Désactiver les fonctionnalités de transformation/injection de scripts, notamment Rocket Loader et l’obfuscation d’email. Vérifier les véritables réponses HTTP après publication. Aucun compte Cloudflare, domaine ou projet d’hébergement n’a été créé.

## Sécurité et maintenance

Lire [AUDIT.md](docs/AUDIT.md) et [RAPPORT.md](docs/RAPPORT.md) avant publication. Deux avis de sécurité sans correctif amont affectent la chaîne d’outillage. `npm audit` reste non vierge : ne pas le remplacer par une affirmation « zéro vulnérabilité ». `npm run audit:review` affiche les risques examinés et échoue sur un nouvel avis ou à l’expiration de la revue, le **17 novembre 2026**. Revoir les exceptions à cette date, sans les prolonger automatiquement.

Les scripts d’installation d’esbuild sont explicitement refusés ; les binaires fournis par ses dépendances optionnelles suffisent pour les compilations vérifiées. Ne pas approuver globalement les scripts de dépendances.

Dependabot prépare les mises à jour. À chaque changement Nuxt/Vue, régénérer puis retester la CSP, la navigation, les thèmes et le sous-chemin. Maintenir les dates, liens et informations de formation ; les certifications en préparation ne doivent pas être confondues avec des certifications obtenues.

### Illustration de l’accueil

Dans `app/app.config.ts`, modifier `heroIllustration` :

- `'landscape'` : composition de courbes continues (par défaut).
- `'network'` : illustration réseau d’origine, conservée dans `NetworkArt.vue`.

Le choix s’applique aux deux langues et aux deux thèmes. Relancer la génération pour mettre à jour la version statique. L’illustration décorative est un SVG local, sans texte, dont les couleurs suivent le thème.

Retry deployment