# Rapport de livraison

> Configuration des langues centralisée — 18 octobre 2026 : `shared/languages.ts` définit les langues, leurs libellés, leurs locales de référencement et la langue par défaut. Les routes, le sélecteur, les dictionnaires découverts automatiquement, les alternates, le sitemap, les redirections et les cartes de partage utilisent ce registre. Les 36 tests passent sous `/Portfolio/`, et la génération finale à la racine vérifie 79 HTML. Lint, formatage et TypeScript réussis. Une copie isolée a aussi été compilée avec une troisième langue de test ajoutée uniquement au registre et dans un fichier JSON : 54 pages indexables générées, menu à trois choix, métadonnées, accessibilité à 320 px, fermeture par Échap et navigation sans JavaScript vérifiés. Ce dictionnaire de test réutilisait les valeurs anglaises ; aucune traduction espagnole ni troisième langue n’est livrée. La procédure d’ajout est dans le README. Aucun déploiement distant.

> Préfixes explicites — 18 octobre 2026 : l’anglais utilise désormais `/en/` et le français `/fr/`. La racine et les anciennes adresses sans langue redirigent vers leur version anglaise. Les liens, canonical, hreflang et le sitemap utilisent ces préfixes. L’export compte 79 HTML : 36 pages indexables, 18 redirections sans préfixe, 24 anciennes pages de compatibilité et une 404. Les 34 tests passent à la racine et sous `/Portfolio/`, dont les redirections HTTP sans JavaScript et le secours HTML/JavaScript conservant paramètres et ancre. La documentation de déploiement détaille la différence entre les règles HTTP et le secours pour GitHub Pages.

## Mise à jour bilingue — 18 octobre 2026

L’anglais est maintenant la langue par défaut (`/`) et le français reste disponible sous `/fr/`. Les 18 pages de contenu existent dans les deux langues, dont les 14 fiches projets : l’export compte 36 pages indexables et 61 fichiers HTML avec la 404 et les pages de compatibilité. Le sélecteur EN / FR conserve la page, les paramètres et l’ancre pendant la navigation. Les deux langues sont pré-rendues ; aucun cookie de langue ni service de traduction tiers n’est utilisé.

La traduction couvre le parcours, les projets, les qualifications, les libellés accessibles, les messages des boutons, la confidentialité et les métadonnées. Canonical, hreflang, sitemap et cartes de partage distinguent les versions. Le contenu français actuel du propriétaire est conservé. La 404 statique propose un retour anglais et un retour français.

Lint, formatage, TypeScript et vérification des 61 HTML réussis. Les 32 scénarios navigateur ont été validés à la racine (30 lors de la première exécution, puis les deux assertions d’URL corrigées) et les 32 passent ensemble sous `/Portfolio/`. Couverture supplémentaire : défaut anglais malgré un navigateur français, changements de langue avec thème et ancre conservés, 28 fiches consultées sans JavaScript, accessibilité anglaise et en-tête de 320 à 1440 px. Les versions anglaise et française ont été examinées visuellement.

Captures actuelles : [accueil anglais](previews/en-desktop.png), [mobile anglais](previews/en-mobile.png), [accueil français sombre](previews/fr-desktop.png), [mobile français](previews/fr-mobile.png). Les anciennes mesures Lighthouse ci-dessous n’ont pas été remesurées pour cette mise à jour. Aucun déploiement distant effectué.

## Historique de la livraison initiale

> Mise à jour après livraison : les captures de certifications et l’extrait LinkedIn fournis ont été intégrés. Le catalogue contient désormais 14 projets, soit 18 pages indexables et 43 fichiers HTML avec les pages de compatibilité. Lint, TypeScript, compilation et contrôle de l’export réussis. Sur les 25 scénarios navigateur, 24 passent immédiatement ; celui du profil passe après adaptation à la présentation d’accueil modifiée par le propriétaire, en vérifiant désormais l’établissement dans la rubrique Formation. Les mesures Lighthouse et captures ci-dessous restent celles de la livraison initiale. Les sources ajoutées sont détaillées dans l’inventaire.

17 octobre 2026. Site réalisé et vérifié localement ; aucune publication distante. Ce document décrit la version livrée et remplace les choix provisoires de la conception lorsqu’ils diffèrent.

## 1. Architecture définitive

Portfolio statique en français : accueil, catalogue filtrable, dix fiches projets, parcours et confidentialité. Les 14 pages indexables sont pré-rendues. L’export comprend aussi une 404 et 24 pages de compatibilité avec les anciennes adresses, soit 39 fichiers HTML. Aucun serveur applicatif ni formulaire distant. Contact par email, LinkedIn et GitHub.

## 2. Technologies et raisons

Nuxt 4.6.2 et Vue 3.5.44 répondent au choix demandé et fournissent routage, composants et pré-rendu. TypeScript strict sécurise les structures de contenu. CSS natif et SVG évitent une bibliothèque d’interface ou d’animation. Les polices Inter sont servies localement. Aucun React. Node 24.22.0 est fixé pour reproduire les builds. Le lockfile et les versions directes sont conservés.

## 3. Design et rédaction

Fond clair légèrement bleuté, texte sombre, accent bleu ; déclinaison sombre et préférence système. Typographie lisible, grilles simples, espaces réguliers, schémas réseaux et spatial en SVG. Le responsive privilégie une colonne sur téléphone. Animations discrètes et respect de la réduction des mouvements.

Le titre d’accueil est « Kylian Gachet ». La présentation indique simplement le M1 à Reims et les étapes précédentes. Les slogans et conclusions génériques ont été retirés. Les expériences, compétences, projets, loisirs et qualifications ont été actualisés avec les CV fournis. Le BUT est obtenu, l’année ENSEIRB est terminée et le M1 commence en septembre 2026. Les certifications en préparation sont séparées des résultats obtenus. Les recherches de poste et candidatures anciennes sont exclues.

Captures finales : [ordinateur clair](previews/desktop-light.png), [ordinateur sombre](previews/desktop-dark.png), [téléphone](previews/mobile-light.png).

## 4. Organisation du code

| Emplacement | Rôle |
| --- | --- |
| `app/pages/` | Routes et contenu éditorial des pages |
| `app/components/` | Navigation, thème, cartes, illustrations, parcours, contact |
| `app/data/` | Données typées du profil et des dix projets |
| `app/assets/` | CSS et polices locales |
| `shared/site.ts` | Validation de l’URL canonique et du sous-chemin |
| `scripts/` | Finalisation sécurisée, vérification d’export, aperçu et audit |
| `tests/` | Scénarios Playwright et contrôles axe |
| `.github/` | CI, déploiement manuel et mises à jour Dependabot |

## 5. Résultats des vérifications

Installation `npm ci`, lint sans avertissement, formatage, TypeScript strict et génération statique réussis. Contrôle des 39 HTML, ressources locales, ancres, métadonnées et exclusions réussi.

**25 tests Playwright réussis à la racine, puis les mêmes 25 sous `/Portfolio/`.** Couverture : navigation, filtres, thèmes et persistance, refus du stockage, menu mobile et clavier, copie d’email et échec simulé, page 404, contenu sans JavaScript, données actualisées, requêtes externes et CSP. Les contrôles axe couvrent cinq pages représentatives dans les deux thèmes. Quatre largeurs sont vérifiées : 320, 390, 768 et 1440 px. Les cartes restent dans leurs limites et aucun débordement horizontal n’est détecté dans les pages testées.

L’export final est revenu à la racine par défaut ; son contrôle statique a été relancé. Les captures finales ont été examinées en clair, sombre et sur téléphone.

### Mesure de performance effectuée

Lighthouse **13.5.0**, Chromium local, accueil de l’export final servi avec gzip sur `127.0.0.1:4173`, profil mobile avec ralentissement simulé. Une mesure finale, le 17 octobre 2026 ; ce ne sont pas des données de visiteurs ni une mesure sur l’hébergement de production.

| Indicateur | Résultat |
| --- | --- |
| Performance | 98 / 100 |
| Accessibilité automatisée | 100 / 100 |
| Bonnes pratiques | 100 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 1,8 s |
| Largest Contentful Paint | 2,0 s |
| Total Blocking Time | 60 ms |
| Cumulative Layout Shift | 0 |
| Ressources transférées dans ce scénario | 156 Kio |

Rapport brut : [lighthouse-mobile.json](lighthouse-mobile.json). Ces scores varient selon la machine, le réseau et l’hébergement ; le score d’accessibilité ne prouve pas une conformité exhaustive.

## 6. Audit de sécurité

La revue détaillée et ses limites sont dans [AUDIT.md](AUDIT.md). CSP restrictive calculée à la génération, scripts et polices locaux, pas d’HTML utilisateur interprété, pas de secret applicatif, pas de suivi tiers. Un test injecte un script inline et vérifie son blocage effectif. La recherche finale de motifs de secrets sur 109 fichiers source et export n’a trouvé aucune correspondance ; aucune source map dans l’export.

L’audit npm reste non vierge : **11 entrées hautes correspondant à deux avis racines**, `braces` et `node-forge`, et à leur propagation aux parents. Ils concernent la chaîne d’outillage. L’audit `--omit=dev` les rapporte aussi. Les versions corrigées n’étaient pas disponibles au moment de la revue. Le site publié est un ensemble de fichiers, sans serveur Nuxt/Nitro ; cela limite l’exposition sans corriger ces bibliothèques. Le [rapport npm brut](audit-dependencies.json) est conservé.

## 7. Problèmes corrigés

- Présentation trop publicitaire et situation scolaire ancienne : rédaction directe et parcours actualisé avec les documents et précisions fournis.
- Cartes tronquées sur mobile : hauteur adaptée au contenu et assertion de non-troncature.
- Navigation mobile au clavier : gestion du focus et fermeture par Échap.
- Nom accessible du logo incohérent : libellé corrigé.
- Ressources de l’aperçu non compressées et chargement de police : gzip, cache des assets versionnés et préchargement de la graisse utilisée au premier affichage.
- Alertes modérées du parseur CSS : mise à jour de la chaîne ESLint ; passage de 13 à 11 entrées npm.
- Risque de fallback SPA servi avec un succès pour une adresse inconnue : retrait du fichier 200 et vraie page 404 statique.

## 8. Risques résiduels

Les deux avis transitifs restent ouverts. La revue temporaire expire le **17 novembre 2026** ; le script échoue sur un avis nouveau ou une exception expirée. GitHub Pages ignore les en-têtes personnalisés : la CSP meta ne fournit notamment pas la protection anti-frame. Les informations de cursus, certifications, dates et liens nécessitent un entretien régulier.

## 9. Contrôles non exécutés

Pas de publication, de test distant, de vérification TLS ou d’en-têtes sur un vrai domaine. Workflows préparés mais non exécutés sur GitHub. Pas de test Safari/Firefox ou de téléphone physique ; les tests utilisent Chromium et des tailles de fenêtre. Pas de lecteur d’écran réel, d’audit humain tiers, de certification WCAG ou de contrôle juridique. Les résultats professionnels et diplômes reposent sur les sources fournies, sans validation auprès des organismes.

## 10. Déploiement

Les commandes complètes figurent dans le [README](../README.md). Choisir l’URL réelle avec `SITE_URL`, générer avec `npm run generate`, contrôler puis tester avec la même variable. Publier uniquement `.output/public`.

GitHub Pages : définir `PORTFOLIO_SITE_URL`, activer Pages via Actions et lancer le workflow manuel après décision de publication. Cloudflare Pages : export statique avec le fichier `_headers` pour appliquer les protections HTTP. Dans les deux cas, vérifier après publication les liens directs, la 404, les ressources, HTTPS et les réponses HTTP réelles. Aucun compte ni domaine n’a été modifié.

## 11. Maintenance

Examiner les propositions Dependabot et les deux avis ouverts avant publication. Ne pas prolonger automatiquement les exceptions ou utiliser une correction forcée pour masquer les alertes. Après changement Nuxt/Vue, vérifier à nouveau la CSP, l’export, les thèmes et le sous-chemin. Mettre à jour les données dans `app/data/`, conserver la distinction entre formation suivie et certification acquise, et relire les détails professionnels avant de publier de nouveaux éléments.
