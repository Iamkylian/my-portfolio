# Illustration de l’accueil

`app/components/LandscapeArt.vue` dessine une composition de 18 courbes SVG continues, régulièrement décalées. Il n’y a plus de relief central, de raccords ni de faisceau dense. Deux courbes sont légèrement accentuées. Le dessin traverse toute la largeur de la zone d’accueil et s’estompe en haut et en bas pour se fondre dans la page.

Sur mobile, un cadrage dédié place les courbes sous la présentation. La composition suit les couleurs du thème, reste fixe et ne capture pas les clics. Le SVG réserve son espace pour éviter les décalages de mise en page.

Dans `app/app.config.ts`, `heroIllustration` choisit :

- `landscape` : composition de lignes, par défaut ;
- `network` : illustration réseau d’origine, conservée intacte.

Le choix s’applique aux deux langues. Régénérer le site statique après modification.
