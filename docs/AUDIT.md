# Revue de sécurité du portfolio

> Centralisation des langues — 18 octobre 2026 : aucune dépendance ni requête externe ajoutée. Les codes de langue sont validés comme segments d’URL uniques ; seuls les dictionnaires locaux des langues déclarées sont utilisés. Une traduction absente ou mal formée échoue explicitement. Les tests de CSP et de ressources locales passent avec la configuration centralisée. Les résultats et limites de l’audit des dépendances ci-dessous restent inchangés.

> Préfixe `/en/` — 18 octobre 2026 : 79 HTML après ajout des pages de redirection ; toujours 36 pages indexables. Le script de redirection est local, utilise des cibles générées et vérifie la même origine. La CSP reste inchangée. Les 34 tests navigateur passent à la racine et sous `/Portfolio/` ; aucun déploiement distant n’a été effectué.

> Mise à jour bilingue du 18 octobre 2026 : 36 pages indexables, 61 HTML au total. Les traductions sont locales et rendues comme du texte Vue, sans HTML interprété ni fournisseur externe. La langue vient de la route ; aucun stockage ou cookie supplémentaire. Aucune dépendance ajoutée. L’export conserve sa CSP restrictive et les tests navigateur de blocage de scripts et de requêtes locales passent. Le contrôle des assets et des liens inclut les alternates de langue. Cette mise à jour ne constitue pas un nouvel audit complet des dépendances ; les avis et limites recensés ci-dessous restent à suivre.

Date : 17 octobre 2026. Revue locale du code, du graphe npm, des workflows et de l’export statique. Cette auto-revue est séparée de l’implémentation ; ce n’est pas une certification ni un audit indépendant par un tiers.

## Architecture et exposition

Le déploiement prévu contient uniquement `.output/public` : HTML, CSS, JavaScript navigateur, polices et images. Aucun processus Nuxt/Nitro, API, base de données, compte, secret ou traitement de formulaire n’est nécessaire en production. Le serveur `scripts/preview.mjs` est réservé à la vérification sur `127.0.0.1`.

Les entrées interactives sont des filtres de catégories, une préférence de thème à valeurs contrôlées et la copie d’une adresse publique. Les contenus sont des données locales typées rendues par Vue. Aucun `v-html`, interprétation d’HTML utilisateur, `eval`, iframe ou script tiers n’est introduit. Le choix de thème tolère le refus de localStorage.

## Contrôles effectués

- Installation réelle avec `npm ci`, Node 24.22.0 et lockfile conservé. Scripts d’installation esbuild refusés ; compilation fonctionnelle avec le binaire de dépendance optionnelle.
- Lint sans avertissement, formatage, TypeScript strict et compilation statique.
- Contrôle des 39 fichiers HTML : 14 pages indexables, une 404 et 24 pages de compatibilité. Vérification des références locales, ancres, métadonnées uniques et exclusion des source maps, clés privées et fichiers de configuration sensibles attendus.
- Lecture des composants, scripts de génération et workflows ; inspection des payloads et bundles. Les objets de projets importés sont tous publics ; les informations non retenues des CV restent hors du code applicatif.
- Recherche de motifs de clés privées et de tokens courants dans les sources et l’artefact. Aucun motif détecté. Cette recherche limitée ne constitue pas une garantie exhaustive d’absence de secrets.
- Test navigateur avec la CSP réellement appliquée : ajout d’un script inline, réception d’un événement `securitypolicyviolation` et vérification que le script n’a pas exécuté son effet.
- Contrôle des en-têtes locaux, de la console et des requêtes pendant la navigation : pas de requête vers un service tiers dans le scénario testé.
- Le contenu principal et les liens des projets restent accessibles sans JavaScript.

## CSP et en-têtes

`scripts/finalize.mjs` calcule les empreintes SHA-256 des blocs exécutables présents dans le HTML final. Aucune permission `unsafe-inline` ou `unsafe-eval`. Les handlers et attributs style inline font échouer la préparation. Le script de thème est un fichier local chargé avant affichage ; les polices sont locales.

Le fichier `_headers` contient CSP, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, Permissions-Policy et HSTS sans sous-domaines ni preload. La longueur de la CSP est contrôlée pour l’hébergeur. Le serveur local a servi ces en-têtes pendant les tests.

Une CSP en balise meta est aussi insérée pour GitHub Pages. Elle **ne remplace pas** les en-têtes : `frame-ancestors` est exclu car non applicable via meta. GitHub Pages ignore `_headers`. Il reste donc une différence de protection réelle entre cet hébergement et un hébergeur statique acceptant les en-têtes personnalisés, comme Cloudflare Pages.

Aucun domaine n’étant publié, les réponses de production, TLS, HTTPS forcé, HSTS distant, caches et protections de compte ne sont pas validés. Ils doivent l’être après une publication explicitement autorisée.

## Audit des dépendances : résultat non vierge

Le rapport initial comptait **13 entrées npm** : 11 hautes et 2 modérées. La mise à jour d’`eslint-plugin-vue` vers 10.11.1 a retiré les entrées liées au parseur CSS vulnérable. ESLint a aussi été mis à jour vers une version maintenue.

Le rapport final complet et l’audit `--omit=dev` comptent chacun **11 entrées de sévérité haute**, issues de **deux avis racines** et de leur propagation dans les dépendances parentes. Il ne s’agit pas de onze vulnérabilités distinctes dans le code du portfolio. Le rapport brut complet est conservé dans [audit-dependencies.json](./audit-dependencies.json).

| Avis | Dépendance et chemin | Risque et exposition retenue |
| --- | --- | --- |
| [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | `braces@3.0.3`, via Nuxt → Nitro → globby → micromatch | Épuisement de pile avec des motifs très imbriqués. Utilisé par l’outillage de fichiers ; aucune entrée de visiteur n’est transmise à ces outils dans le site statique. Un build à partir d’entrées non fiables reste une surface à surveiller. |
| [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) | `node-forge@1.4.0`, via Nuxt → Nitro → listhen | Vérification de signatures RSA PKCS#1 v1.5 trop permissive. Aucun usage de vérification RSA ni serveur TLS listhen dans l’export public. |

Les registres npm et les avis officiels ont été consultés : aucune version corrigée de ces deux bibliothèques n’était disponible lors de la revue. La proposition automatique de rétrogradation de Nuxt n’a pas été appliquée ; elle ne constitue pas une stratégie de correction sûre et maintenable.

Nuxt est déclaré dans `dependencies`, donc `npm audit --omit=dev` signale aussi ces entrées. **L’absence de serveur dans l’export ne doit pas être confondue avec un audit npm de production sans alerte.** Les risques sont circonscrits par l’architecture, pas corrigés dans les bibliothèques.

`npm run audit:review` conserve le rapport sous `.cache/reports/`, affiche explicitement ces risques résiduels et examine uniquement ces deux URL d’avis, pour les versions exactes revues. Il échoue en cas de nouvel avis, de version non revue, de rapport indisponible ou après le **17 novembre 2026**. Les exceptions ne s’étendent pas automatiquement. Ne pas lancer `npm audit fix --force` pour rendre le compteur artificiellement vert.

## CI/CD et chaîne d’approvisionnement

- Versions directes figées et lockfile ; intégrité des archives gérée par npm. Pas de dépendance React dans le graphe vérifié.
- Actions GitHub officielles épinglées à des SHA récupérés via l’API publique.
- `contents: read` pour les validations ; pas de secret destiné aux PR, pas de `pull_request_target`, checkout sans persistance des identifiants.
- Déploiement `workflow_dispatch` uniquement, avec URL cible explicitement configurée et permissions limitées au job de déploiement.
- Artefact limité à `.output/public`. Ni sources de candidature, rapports, `.env`, répertoire serveur ou dépendances Node ne sont envoyés.
- Dependabot configuré ; protections de branche et d’environnement à configurer par le propriétaire avant publication. Workflows relus mais non exécutés sur GitHub pendant cette mission.

## Vie privée et contenu

Les CV et lettres ont été lus localement, sans import de leurs PDF dans le site. Les recherches d’alternance, candidatures, rythmes et villes envisagés sont exclus. L’email retenu est celui fourni dans les documents récents. Pas de téléphone ni adresse précise publiés. Pas de détails techniques confidentiels Airbus, de documents internes ou de mesures inventées.

Le seul stockage applicatif est la préférence de thème dans le navigateur. Les hébergeurs et services email/LinkedIn peuvent traiter des données selon leurs propres règles ; la page de confidentialité ne prétend pas qu’aucun journal technique n’existe.

## Risques résiduels et contrôles non réalisés

Les deux avis transitifs sans correctif restent ouverts. Les mises à jour, le compte GitHub, les accès d’hébergement et les modifications futures peuvent introduire de nouveaux risques. Aucun test d’intrusion distant, scan de comptes, vérification de fichiers privés tiers ou audit de l’ancien site n’a été effectué. Aucun audit humain tiers, lecteur d’écran réel ou validation juridique de mentions légales n’est revendiqué.

Revoir les alertes avant publication, maintenir les exceptions dans le temps, retester les en-têtes sur le vrai domaine et faire relire les contenus professionnels si leur niveau de détail évolue.
