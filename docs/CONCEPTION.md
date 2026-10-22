# Portfolio Kylian Gachet — dossier de conception

Date : 17 octobre 2026. Périmètre : phases 1 à 4 du cahier des charges.

Ce dossier décrit une proposition concrète avant développement. Aucun site, dépendance, workflow de publication ou service distant n'a été créé. Les contrôles préalables réalisés sont distingués des tests à exécuter après implémentation. Le parcours a été actualisé avec les précisions fournies directement par Kylian pendant cette phase.

## 1. Diagnostic et positionnement

Le [portfolio actuel](https://iamkylian.github.io/Portfolio/) a été consulté sous forme de texte et de données de contenu, sans étude de son apparence. Son HTML et son dépôt décrivent douze projets, une expérience de Data Analyst chez Airbus, un BUT Informatique à Blagnac et plusieurs formations complémentaires. Le serveur annonce une dernière modification le 16 mars 2025 ; ces informations ne permettent pas de décrire le poste actuel en octobre 2026.

LinkedIn n'a pas pu être lu directement : l'accès est refusé. Des extraits indexés publics des versions [anglaise](https://fr.linkedin.com/in/kyliangachet/en) et [française](https://fr.linkedin.com/in/kyliangachet) ont néanmoins été consultés. Ils mentionnent notamment ENSEIRB-MATMECA, 2025–2026, et ActInSpace en 2026. Ils constituent des indications à recouper, pas une consultation exhaustive du profil.

Le [profil GitHub public](https://github.com/Iamkylian) confirme une orientation déclarée vers la cybersécurité et les réseaux. Le [site Bastion](https://iamkylian.github.io/bastion-site/) attribue à Kylian le rôle « Cybersecurity Lead » dans l'équipe du projet. Ce rôle ne devient pas automatiquement un intitulé de poste ou un niveau d'expertise général.

Kylian a confirmé directement : BUT Informatique obtenu, puis une année en télécommunications à l'ENSEIRB-MATMECA, puis entrée en septembre 2026 en M1 Réseaux et Télécommunications, parcours Administration et Sécurité des Réseaux. L'établissement du master et la date de fin de l'expérience Airbus ne sont pas encore fournis. Aucun poste actuel chez Airbus ne sera affirmé.

Le positionnement proposé est **« Cybersécurité & réseaux »**, appuyé par un socle en développement. La présentation peut désormais être rédigée ainsi : « Étudiant en M1 Réseaux et Télécommunications, parcours Administration et Sécurité des Réseaux, je construis mon parcours autour des réseaux et de leur sécurité, avec un socle en développement acquis en BUT Informatique. » Elle n'ajoute aucun titre d'ingénieur diplômé, spécialité offensive, expérience SOC ou maîtrise d'outil.

Le principal travail éditorial consiste à sélectionner les preuves pertinentes, actualiser les dates et distinguer travail personnel, travail d'équipe et objectifs de projet. Les résultats marketing de l'ancien site ne seront pas repris sans preuves : gain de temps non mesuré, scores Lighthouse dits optimaux, précision d'un modèle sans protocole d'évaluation.

Le détail des sources et du contenu figure dans [INVENTAIRE.md](./INVENTAIRE.md).

## 2. Comparaison technique

| Option | Intérêt | Contraintes et compromis | Décision |
| --- | --- | --- | --- |
| Vue 3 + Vite, SPA | Outillage initial réduit, hébergement statique, liberté graphique | HTML initial pauvre sans prérendu ; métadonnées sociales et routes profondes à organiser ; un SSG ajouté devient une deuxième décision d'architecture | Possible pour une petite application, moins adapté à ce portfolio riche en contenu |
| Nuxt 4, génération statique | HTML complet à la compilation, routage par fichiers, métadonnées par page, composants Vue et TypeScript | Chaîne de compilation plus importante ; hydratation et CSP à vérifier ; reconstruction lors des changements de contenu | **Recommandé** |
| Nuxt 4, SSR permanent | Rendu personnalisé et données actualisées à chaque requête | Serveur et dépendances à maintenir en production ; coûts et surface d'attaque supplémentaires sans besoin fonctionnel identifié | Écarté |
| VitePress, thème sur mesure | Vue et génération statique, excellent pour Markdown et publications techniques | Thème spécifique à développer pour cette direction graphique ; intérêt supérieur si le contenu devient surtout un journal technique | Alternative crédible, non retenue ici |

La [documentation Vue](https://vuejs.org/guide/scaling-up/ssr.html) recommande d'étudier le SSG lorsque le contenu est identique pour chaque visiteur. La [documentation Nuxt](https://nuxt.com/docs/4.x/getting-started/deployment) confirme le prérendu avec `nuxt generate` et `ssr: true`. `ssr: false` ne sera pas utilisé : ce serait une SPA statique, sans le HTML de contenu recherché. [VitePress](https://vitepress.dev/guide/what-is-vitepress) reste une option valable pour un site à forte dominante Markdown.

### Socle proposé

- Nuxt 4, Vue 3, TypeScript strict, CSS natif et composants Vue ciblés.
- HTML généré dans `.output/public` ; aucun serveur applicatif à déployer.
- Données locales typées pour le profil, le parcours et les projets. Pas de CMS, base de données, authentification, route API ou moteur de recherche distant.
- Pas de bibliothèque d'animations, de composants généraliste ou de store global pour les seuls thème et navigation.
- ESLint et contrôle TypeScript séparés de la génération. Tests navigateur en dépendances de développement uniquement.

### Versions vérifiées, sans installation

Les métadonnées du registre npm ont été consultées directement le 17 octobre 2026 :

| Paquet | Observation | Conséquence |
| --- | --- | --- |
| `nuxt` | `4.6.2`, Node `^22.22.3 || ^24.15.0 || >=26.0.0`, dépend de Vue `^3.5.44` | Prévoir Node 24 à un correctif maintenu et au moins 24.15.0 |
| `vue` | `3.5.44` | Compatible avec la plage déclarée par Nuxt |
| `typescript` | Le tag `latest` renvoie `7.0.2` ; Nuxt 4.6.2 déclare `6.0.3` dans ses dépendances de développement | Partir de TypeScript 6.0.3, puis valider réellement avec Nuxt et vue-tsc ; ne pas sélectionner `latest` aveuglément |
| `vue-tsc` | `3.3.13`, peer TypeScript `>=5.0.0` | Compatibilité déclarée, à confirmer par le contrôle du projet |

Sources : [Nuxt](https://registry.npmjs.org/nuxt/latest), [Vue](https://registry.npmjs.org/vue/latest), [TypeScript](https://registry.npmjs.org/typescript/latest), [vue-tsc](https://registry.npmjs.org/vue-tsc/latest). Les URL `latest` évolueront ; les valeurs ci-dessus sont celles observées à la date du dossier.

Node 24.13.1 existe localement sous NVM mais n'est pas dans le PATH du shell initial et ne satisfait pas la contrainte de Nuxt 4.6.2. Une mise à niveau sera nécessaire avant installation. Aucun changement d'environnement n'a été effectué dans cette phase. Les versions effectives devront être figées dans un lockfile et validées par `npm ci`, typage et génération ; aucune compatibilité exécutée n'est revendiquée ici.

## 3. Direction artistique : Cyber Minimalism — Precision & Trust

Une présentation éditoriale inspirée de la précision d'un dossier technique : grands titres, alignements nets, composition asymétrique mesurée, repères numérotés discrets et schémas réellement explicatifs. Le nom et les projets constituent l'identité, sans faux indicateurs de sécurité, terminal décoratif ou scores de compétences.

### Palette et tokens

| Token | Clair | Sombre |
| --- | --- | --- |
| `background` | `#F6F7F9` | `#0D1420` |
| `surface` | `#FFFFFF` | `#151F2D` |
| `text` | `#17243A` | `#ECF1F7` |
| `text-muted` | `#536176` | `#A9B7C9` |
| `accent` | `#185ABD` | `#86B7FF` |
| `control-border` | `#7B8799` | `#718198` |
| `divider` décoratif | `#DEE3EA` | `#2A3749` |

Un seul accent bleu. Les séparateurs faibles ne servent pas à identifier seuls un champ ou un contrôle. Les liens sont aussi identifiables par leur soulignement ; l'état actif n'est pas uniquement une couleur.

Contrastes calculés par luminance relative sRGB avec Python, sur couleurs opaques :

| Association | Clair | Sombre |
| --- | --- | --- |
| Texte / fond | 14,51:1 | 16,25:1 |
| Texte secondaire / fond | 5,87:1 | 9,05:1 |
| Accent / fond | 6,05:1 | 8,99:1 |
| Texte secondaire / surface | 6,29:1 | 8,14:1 |
| Accent / surface | 6,49:1 | 8,08:1 |
| Bordure de contrôle / surface | 3,64:1 | 4,18:1 |

Bouton principal : fond accent avec texte blanc en clair (6,49:1), et texte `#0D1420` en sombre (8,99:1). Ces calculs vérifient la palette, pas la conformité WCAG du site futur. Les états hover, focus, disabled et les éléments sur images devront être contrôlés après implémentation.

### Typographie, rythme et composants

- Inter Variable locale en WOFF2, graisses 400 à 600, avec repli système. JetBrains Mono locale, une graisse, uniquement pour dates, catégories et petits repères. Licences conservées, aucun appel Google Fonts.
- Corps 16 à 18 px, interligne environ 1,6, paragraphes limités à 65 caractères environ. Titres fluides, titre principal 40 à 80 px selon largeur.
- Échelle d'espacement : 4, 8, 12, 16, 24, 32, 48, 64 et 96 px. Conteneur 1 200 px maximum, marges 20 px sur mobile, 32 à 48 px sur desktop.
- Cartes de projets à bordure fine, coins de 10 à 12 px, titres explicites, contexte, rôle connu, technologies utiles et lien descriptif. Pas de carte entière contenant des liens imbriqués.
- Premier projet mis en avant dans une composition plus large ; les suivants dans une grille simple. Pas de douze cartes identiques occupant l'accueil.
- Illustrations : captures de projets vérifiées et anonymisées, ou schémas SVG originaux décrivant des flux connus. Aucun visuel de substitution présenté comme une réalisation réelle.
- En-tête compact avec nom, Projets, Parcours, Contact et sélecteur de thème. Navigation mobile courte, sans panneau plein écran inutile.

### Thèmes, mouvement et mobile

Préférence système initiale, choix manuel clair/sombre et retour au système, sauvegarde locale limitée à cette préférence. Petit script de thème avant le premier affichage, compatible CSP et avec gestion des refus de stockage. Le HTML de contenu reste stable entre génération et hydratation ; aucun masquage global des erreurs d'hydratation.

Transitions de couleur et de bordure de 120 à 180 ms. Aucun contenu dépendant d'une animation pour apparaître. `prefers-reduced-motion` désactive les mouvements et le défilement animé.

Une colonne sur mobile, deux sur tablette si le contenu le permet, grille éditoriale sur desktop. Navigation clavier, lien d'évitement, focus visible et non occulté, cibles confortables de 44 px, reflow à 320 px et zoom à 200 % prévus. Menu mobile : état annoncé, fermeture par Échap, focus cohérent après fermeture.

## 4. Architecture des contenus

| Structure | Lecture rapide | Lecture technique | Conclusion |
| --- | --- | --- | --- |
| One-page complète | Simple au début, mais longue avec douze projets | Détails difficiles à partager et à retrouver | Trop dense pour l'inventaire |
| Multipage intégrale | Profil dispersé entre trop d'écrans | Bonne profondeur | Trop de navigation pour un recruteur |
| Hybride | Synthèse autonome sur l'accueil | Pages de projets avec URL propre | **Retenue** |

### Parcours de lecture

1. **Accueil `/`** : identité, positionnement « Cybersécurité & réseaux » et statut M1 depuis septembre 2026, lien vers les projets et contact ; trois projets sélectionnés ; domaines reliés à ces preuves ; parcours synthétique ; contact.
2. **Projets `/projets/`** : catalogue des réalisations documentées, catégories simples si elles facilitent effectivement la lecture. Aucun filtre indispensable à l'accès aux contenus.
3. **Projet `/projets/[slug]/`** : contexte, objectif, contribution personnelle connue, approche, technologies, livrables vérifiables, limites et liens disponibles. Sommaire uniquement pour les pages longues. Les rubriques sans données sont omises.
4. **Parcours `/parcours/`** : M1 depuis septembre 2026, année en télécommunications à l'ENSEIRB-MATMECA, BUT obtenu, expérience Airbus et formations complémentaires. La recherche d'alternance de 2025 ne sera pas présentée comme actuelle. L'année en école d'ingénieur ne sera pas présentée comme un diplôme obtenu.
5. **Confidentialité `/confidentialite/`** : absence de collecte applicative, préférence de thème locale, services d'hébergement et liens externes ; ne pas prétendre que l'hébergeur ne conserve aucun journal.
6. **404** : vraie page d'erreur utile, lien vers accueil et projets, avec comportement testé en accès direct.

Sélection d'accueil proposée : **Bastion / ActInSpace**, sous réserve de préciser la contribution et le résultat du concours ; **RoomService**, pour les échanges MQTT et le déploiement ; **RAG**, pour une réalisation logicielle documentée. Le projet CI/CD pourrait remplacer le RAG si un livrable public ou une description personnelle vérifiable est fourni.

Bastion sera décrit comme un projet d'équipe/concept de concours. Les projections commerciales, délais de réponse et promesses techniques du site ne seront pas transformés en résultats réalisés.

### Contact

| Option | Avantage | Coût ou limite | Choix |
| --- | --- | --- | --- |
| Adresse affichée + lien `mailto:` | Pas de collecte sur le site, aucun secret/API, très simple | Nécessite un client de messagerie ; adresse publiquement accessible | Recommandée, avec LinkedIn en complément |
| Service tiers de formulaire | Envoi dans le navigateur | Traitement par un tiers, configuration anti-abus et dépendance supplémentaires | Non retenu sans besoin explicite |
| Backend de contact | Contrôle du traitement | Validation, limitation de débit, anti-abus, délivrabilité, maintenance | Disproportionné ici |

Le téléphone et la localisation précise ne sont pas nécessaires. Le CV téléchargeable n'est ajouté qu'après actualisation et vérification de ses métadonnées et données personnelles.

### Organisation de code proposée

```text
app/
  app.vue
  layouts/default.vue
  pages/index.vue
  pages/projets/index.vue
  pages/projets/[slug].vue
  pages/parcours.vue
  pages/confidentialite.vue
  error.vue
  components/              # en-tête, pied de page, thème, carte, chronologie
  composables/            # thème seulement si réutilisé
  data/                   # contenus destinés à la publication
  types/                  # contrats Profile, Experience et Project
  assets/css/             # tokens, base et mises en page
public/                   # polices, icônes et images publiques contrôlées
scripts/                  # contrôles de sortie et politique de sécurité
tests/                    # parcours navigateur significatifs
docs/                     # décisions, inventaire et rapports hors artefact public
nuxt.config.ts
```

Les données éditoriales incertaines restent dans la documentation, hors modules importés par l'application. Un champ `draft` ne suffit pas à protéger un contenu : les objets importés peuvent finir dans les bundles ou payloads. Aucun document confidentiel n'entre dans le dépôt.

## 5. Hébergement et sécurité prévue

### Recommandation

**Nuxt statique reste portable. Cloudflare Pages, sans Functions, est recommandé si la maîtrise des en-têtes HTTP est prioritaire ; GitHub Pages reste une option simple avec une limite explicite.** La migration n'est pas effectuée et ne sera pas automatique.

GitHub Pages sait servir les fichiers générés par Nuxt et fournit HTTPS. Le GET du site actuel a renvoyé HTTP 200 et `Strict-Transport-Security: max-age=31556952`. Il n'a pas renvoyé de CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ou Permissions-Policy. C'est une observation sur une réponse, pas un audit exhaustif de l'hébergement.

GitHub Pages n'expose pas de configuration native d'en-têtes personnalisés par site. Un fichier `_headers` ou `routeRules.headers` ne devient pas une politique HTTP sur cet hébergement statique. Une CSP en balise meta pourrait protéger une partie du document, mais ne permet notamment pas `frame-ancestors` ni une politique report-only équivalente. Elle ne répond donc pas à toutes les exigences.

[Cloudflare Pages prend en charge `_headers`](https://developers.cloudflare.com/pages/configuration/headers/) pour ses fichiers statiques. Cela apporte un bénéfice précis sans serveur applicatif : CSP HTTP, protection anti-frame et politiques navigateur. Il faudra vérifier les limites de taille des lignes, la CSP produite par route et les réponses réelles. Désactiver les fonctionnalités injectant/modifiant des scripts, notamment Rocket Loader et l'obfuscation d'email, conformément aux [précautions Nuxt](https://nuxt.com/docs/4.x/getting-started/deployment).

### Politique de sécurité cible, à valider sur le build

- Réduire les sources à l'origine du site ; images, polices, styles et scripts locaux.
- Aucun `v-html`, `eval`, HTML issu d'une URL, redirection contrôlée par un paramètre ou script tiers.
- CSP : base restrictive, `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`, `form-action 'none'`. Sources script/style limitées à l'origine et aux empreintes effectivement nécessaires au HTML Nuxt généré.
- Calculer les empreintes après génération, sur les octets réellement servis ; inspecter aussi import maps, scripts d'initialisation et styles inline. Ne pas inventer de nonce statique ni ajouter `unsafe-inline`/`unsafe-eval` pour faire disparaître une erreur.
- Vérifier hydratation, navigation et thème avec CSP active. Si les empreintes dépassent les limites de l'hébergeur, réduire/externaliser les blocs ou appliquer des règles par route, sans relâcher la politique.
- En-têtes cibles : `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `X-Frame-Options: DENY`, Permissions-Policy interdisant caméra, microphone et géolocalisation.
- HSTS : contrôler le domaine et HTTPS avant configuration. Ne pas activer aveuglément `includeSubDomains` ou le preload. Sur `github.io`, le HSTS est administré par l'hébergeur et porte sur l'hôte, pas le chemin `/Portfolio/`.
- Pas de trackers ni widgets sociaux. Liens externes simples ; `noopener noreferrer` si ouverture dans un nouvel onglet.

Un site statique limite les risques serveur mais conserve les risques XSS/DOM, dépendances compromises, compte de publication compromis, fuite de contenu et mauvaise configuration. L'absence de base de données ne garantit pas l'absence de vulnérabilité.

### Préparation GitHub Pages si conservé

- Déterminer le dépôt cible avant compilation : `/Portfolio/` pour l'adresse historique, `/my-portfolio/` pour un dépôt de projet de ce nom, `/` pour le domaine racine ou un domaine personnalisé. Respecter la casse.
- Configurer `app.baseURL`, URL canonique, sitemap et liens d'assets à partir d'une seule configuration vérifiée.
- Générer explicitement toutes les routes de projets et tester accès direct, rechargement et retour navigateur sous le sous-chemin réel.
- Préparer `.nojekyll` et une vraie `404.html` ; ne pas masquer toutes les erreurs avec une réponse 200.
- Inventorier les anciennes URLs `/projects/...` et conserver des pages de compatibilité lorsque nécessaire. Les pages de renvoi HTML ne sont pas des redirections HTTP 301. Les anciens fragments d'URL peuvent être conservés par ancres de compatibilité.
- Vérifier `Enforce HTTPS` dans les réglages après autorisation, et l'absence de contenu mixte.
- CI de validation séparée du déploiement. Installation `npm ci`, Node compatible figé, actions officielles épinglées à des SHA complets vérifiés.
- `contents: read` pour le build ; `pages: write` et `id-token: write` uniquement sur le job de publication ; pas de secret sur les PR non fiables ni de workflow `pull_request_target` exécutant leur code.
- Au départ, publication manuelle uniquement, avec environnement protégé. Aucun push ou déploiement n'est autorisé par cette phase.
- Publier uniquement `.output/public`, jamais le dépôt, les rapports, `.env`, source maps ou archives de travail.

Sources : [Nuxt sur GitHub Pages](https://nuxt.com/deploy/github-pages), [HTTPS GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy). Les exemples de workflows des documentations ne seront pas copiés sans revue de leurs versions et permissions.

## 6. Plan de validation et limites actuelles

### Déjà réalisé

- Inspection du dépôt local : README et licence, aucune application existante à préserver.
- Lecture textuelle du portfolio, des descriptions de projets, du manifeste de l'ancien dépôt et du profil GitHub public.
- Recoupement partiel avec les extraits LinkedIn et le site Bastion.
- Vérification des douze liens GitHub déclarés : le dépôt Portfolio est accessible ; onze autres renvoient HTTP 404 via l'API publique. Un 404 peut aussi désigner un dépôt privé ou renommé.
- Lecture des en-têtes de l'accueil historique, sans scan ni test intrusif.
- Vérification des métadonnées de versions et de la version Node locale.
- Calcul des contrastes de la palette proposée.

### Après développement : critères de réception

1. Installation reproductible, lint, typage strict, génération de production à la racine et sous le chemin Pages retenu.
2. Vérification de chaque HTML, lien interne, fichier référencé, canonique, métadonnée unique, sitemap et page 404. Texte essentiel disponible sans JavaScript.
3. Tests navigateur des thèmes système/manuel, persistance, stockage indisponible, premier affichage et absence d'erreurs d'hydratation ; navigation mobile et clavier, liens de contact et filtres éventuels.
4. Contrôle automatisé axe, revue manuelle clavier/focus/zoom, contraste des états interactifs, responsive 320/390/768/1440 px, reduced motion ; essai lecteur d'écran si disponible. Un rapport axe seul ne certifie pas WCAG 2.2 AA.
5. Mesures Lighthouse locales répétées sur le build, poids compressé des ressources, requêtes externes et erreurs console. Budgets initiaux proposés : JavaScript initial compressé ≤ 150 Ko, CSS ≤ 35 Ko, polices ≤ 120 Ko. Objectifs à mesurer, pas résultats acquis.
6. LCP cible ≤ 2,5 s, CLS ≤ 0,1 et INP ≤ 200 ms. Distinguer mesures de laboratoire et données terrain ; ne pas annoncer un INP de production depuis un seul Lighthouse.
7. Revue de sécurité séparée de l'implémentation : code, dépendances et transitives, lockfile, workflows, artefacts/payloads, contenu public et CSP active. Analyse `npm audit` complète et production ; pas d'`audit fix --force` automatique. Tracer corrections et recontrôles.
8. Après publication autorisée seulement : vérifier réponses HTTP, CSP, HTTPS, caches et routes chez l'hébergeur réel. Les résultats locaux ne prouvent pas les en-têtes distants.

**Non exécutés à ce stade :** installation, lint applicatif, typage, compilation, tests navigateur, audit de dépendances, scan de secrets du futur artefact, mesures de performances et audit final du nouveau site, puisqu'il n'est pas encore développé. L'examen du manifeste historique n'est pas un audit des vulnérabilités de l'ancien site.

L'audit final pourra adopter une posture critique et être séparé en une passe dédiée ; une auto-revue ne constitue pas une certification indépendante par un tiers.

### Maintenance proposée

Mises à jour de dépendances via PR, suivi des alertes de sécurité, `npm ci` en CI, revalidation des thèmes et CSP après mise à jour Nuxt. Revue trimestrielle des liens, dates, CV et parcours. Ne pas ajouter une dépendance ou un service sans besoin concret. Conserver les décisions et résultats d'audit dans `docs/`, hors publication.

## 7. Données nécessaires à la rédaction définitive

La formation actuelle et l'obtention du BUT ont été confirmées directement pendant la conception. Restent utiles : établissement du master, date de fin de l'expérience Airbus, contribution personnelle à Bastion/ActInSpace, preuve des classements, nouveaux liens de dépôts publics et CV actualisé. Ces absences ne doivent être comblées par aucune invention ; une rubrique peut être omise ou rester en préparation dans les fichiers éditoriaux non publiés.
