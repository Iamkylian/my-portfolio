# Inventaire éditorial et traçabilité

Consultation : 17 octobre 2026. « Confirmé dans une source » signifie que la source contient l'information, pas qu'un diplôme, un résultat ou une compétence a fait l'objet d'une vérification indépendante.

## Sources

| Référence | Accès réalisé | Usage |
| --- | --- | --- |
| Précisions directes de Kylian, conversation du 17 octobre 2026 | Réponse à la question sur le parcours actuel | Source prioritaire : BUT obtenu, une année à l'ENSEIRB-MATMECA, M1 Réseaux et Télécommunications depuis septembre 2026 |
| [Portfolio historique](https://iamkylian.github.io/Portfolio/) | HTML téléchargé, texte extrait | Identité, parcours et inventaire de douze projets ; aucune référence graphique |
| [Données des projets](https://github.com/Iamkylian/Portfolio/blob/main/my-portfolio/src/app/projects.ts) | Fichier public lu | Descriptions, technologies déclarées, dates et liens |
| [Manifeste historique](https://github.com/Iamkylian/Portfolio/blob/main/my-portfolio/package.json) | Fichier public lu | Diagnostic limité des dépendances, aucune réutilisation de code |
| [LinkedIn anglais](https://fr.linkedin.com/in/kyliangachet/en) | Extraits indexés du moteur de recherche ; accès direct refusé | Indications récentes à recouper |
| [LinkedIn français](https://fr.linkedin.com/in/kyliangachet) | Extraits indexés ; accès direct refusé | Projets universitaires historiques |
| [Profil GitHub](https://github.com/Iamkylian/Iamkylian/blob/main/README.md) | README public lu | Orientation cybersécurité/réseaux et intérêts déclarés |
| [Bastion](https://iamkylian.github.io/bastion-site/) | Texte public lu | Existence du projet et rôle indiqué dans l'équipe |
| [Liste des dépôts publics](https://api.github.com/users/Iamkylian/repos?per_page=100&sort=updated) | API publique, 14 entrées reçues | Repérage de liens candidats ; ne prouve pas l'identité de chaque projet historique |

## Identité, expériences et formation

| Information | Source et statut | Traitement proposé |
| --- | --- | --- |
| Kylian Gachet | Portfolio, GitHub, LinkedIn, Bastion concordants | Publier |
| Orientation cybersécurité et réseaux | Demande de l'utilisateur et profil GitHub | Positionnement principal, sans grade d'expertise ajouté |
| Data Analyst en alternance chez Airbus à partir de septembre 2023 | Portfolio historique ; entreprise aussi mentionnée dans les extraits LinkedIn | Expérience historique ; poste actuel et date de fin à confirmer |
| Outil interne d'approbation, traitement ETL et indicateurs métier | Portfolio historique | Description générale ; pas de données internes, captures ou configurations Airbus |
| BUT Informatique obtenu, IUT de Blagnac, début septembre 2022 | Obtention confirmée directement par Kylian ; établissement et début dans le portfolio | Publier comme diplôme obtenu ; année précise d'obtention non explicitement confirmée |
| Une année en télécommunications à l'ENSEIRB-MATMECA | Confirmé directement ; période 2025–2026 dans l'extrait LinkedIn | Étape du parcours ; ne pas présenter comme diplôme d'ingénieur obtenu |
| M1 Réseaux et Télécommunications, parcours Administration et Sécurité des Réseaux, depuis septembre 2026 | Confirmé directement par Kylian | Statut actuel à mettre en avant ; nom de l'établissement non fourni |
| Admissions ENSEEIHT et INSA annoncées en 2025 | Ancien post LinkedIn indexé | Une admission ne prouve pas une inscription ; ne pas fusionner avec ENSEIRB |
| Employé polyvalent Netto, Cestas, étés 2022 et 2023 | Portfolio historique | Historique secondaire, facultatif sur la page parcours |
| Bac général, NSI et LLCER anglais, juin 2022 | Portfolio historique | Une ligne facultative, après les formations supérieures |

Ne pas publier de localisation actuelle : les sources évoquent Toulouse, Bordeaux et Reims à différentes périodes. Le téléphone historique est volontairement exclu de cet inventaire. L'adresse de contact professionnelle déjà publiée peut servir au lien email, après confirmation de son maintien si nécessaire.

## Formations complémentaires et langues

| Élément | État des sources | Précaution |
| --- | --- | --- |
| TOEIC, septembre 2024 | Portfolio et extrait LinkedIn ; score 830/990 dans le portfolio seulement | Présenter comme résultat daté, pas comme preuve actuelle non vérifiée |
| MOOC SecNumAcadémie, août 2023 | Portfolio et extrait LinkedIn | Formation aux fondamentaux ; ne pas présenter comme une qualification professionnelle d'expert ANSSI |
| Introduction to Big Data, UC San Diego/Coursera, juillet 2024 | Portfolio et extrait LinkedIn | Formation complémentaire datée |
| GAIQ, août 2023–août 2024 | Expiration explicite dans les deux sources | Omettre de la sélection principale ; ne jamais afficher comme certification valide actuelle |
| Français et anglais professionnel | Extrait LinkedIn ; TOEIC historique pour l'anglais | Formulation qualitative, pas de nouveau niveau inventé |
| Allemand et japonais élémentaires | Extrait LinkedIn | Facultatifs, secondaires |

## Projets

La colonne de vérification concerne le lien exact déclaré dans le fichier historique. Les réponses ont été contrôlées par GET sur l'API GitHub publique : un 404 signifie « non accessible publiquement à cette adresse », pas nécessairement « inexistant ».

| Projet | Date déclarée | Contenu et technologies sourcés | État / décision éditoriale |
| --- | --- | --- | --- |
| Mémoire RAG et application PDF | 2024 | Python, FastAPI, LangChain, Ollama, indexation vectorielle ; ancien client React/TypeScript | Sujet recoupé par LinkedIn ; `SAE-RAG-Client` renvoie 404. Page détaillée envisageable ; confirmer contribution personnelle |
| RoomService | 2024 | Occupation des salles, MQTT, Docker, Python/PHP/SQL et interface web | `roomservice` renvoie 404 ; dépôt public au nom long lié à l'occupation des salles repéré, correspondance à contrôler |
| BeachAffairs | 2023 | Rétro-conception de base de données, SQL, UML, Win'Design | Sujet recoupé par LinkedIn ; `BeachAffairs-DB` renvoie 404 ; catalogue secondaire |
| Ancien portfolio | 2025 | Next.js, React, TypeScript | `Portfolio` accessible ; exclu de la sélection principale. Incohérence de classement : contexte personnel, type universitaire |
| Amélioration RAG | 2024 | Django, ChromaDB, LangChain, Ollama | `advanced-rag` renvoie 404 ; possible regroupement avec le mémoire si continuité confirmée |
| Anime Face Recognition | 2023 | TensorFlow, OpenCV, Python | `anime-face-rec` renvoie 404 ; ne pas reprendre la précision annoncée de 82 % sans protocole et résultats |
| Apprentissage outils IA | 2022–2024 | Python, Jupyter, TensorFlow, PyTorch | `ai-learning-journey` renvoie 404 ; plutôt apprentissage que réalisation principale |
| Slave Narratives | 2024 | Visualisation historique, CodeIgniter, MariaDB, API Zotero, export PDF | `sae-5-a-01-2024-2025-esclaves-rouge` renvoie 404 ; décrire le projet collectif sans attribuer toutes les fonctions à Kylian |
| Environnement Ubuntu | 2022 | VirtualBox, Bash, configuration et automatisation | `sae-s1-03-vm-config` renvoie 404 ; projet de formation, sans l'assimiler à une administration de production |
| Suivi sportif et coaching | 2025 | Symfony, Angular, EasyAdmin, API REST, MySQL, JWT | `sae-s6-sport-coaching` renvoie 404 ; JWT seul ne prouve pas que l'API est sécurisée |
| Automatisation CI/CD | 2024 | GitLab CI, Docker, scripts, tests et séparation des environnements | `automatisation-cicd` renvoie 404 ; intéressant pour l'axe fiabilité, livrables à documenter |
| Pathfinding géographique | 2023 | Dijkstra, A*, OpenStreetMap, Python, Pandas | `optimisation-algorithmes-pathfinding` renvoie 404 ; date à vérifier car le texte mentionne aussi R5.A.04 ; benchmarks non fournis |
| Bastion / ActInSpace | 2026 selon extrait LinkedIn | Projet d'équipe autour de la protection des communications spatiales ; site Bastion attribuant le rôle Cybersecurity Lead à Kylian | Site et dépôt `bastion-site` publics ; classement 1er Bordeaux / 4e national seulement déclaré dans l'extrait LinkedIn, à confirmer |

La contrainte « aucun React » s'applique à l'implémentation du nouveau portfolio. L'historique technique des anciens projets peut mentionner factuellement React sans l'introduire dans la nouvelle application ; ne pas réécrire leur histoire pour prétendre qu'ils utilisaient Vue.

Autres dépôts publics repérés : `rag-qa-system`, `ImageAnimeAnalysis`, `Projet-Carte`, `SAE-ALT-S3-Dev-23-24-OccupationSalles-Equipe-1`. Leurs noms en font des candidats de remplacement pour les liens historiques ; leur code et leur relation aux fiches n'ont pas été validés dans cette phase. Ne pas remplacer les URLs par simple ressemblance.

DailyBank apparaît dans un extrait LinkedIn français (Java/Oracle, 2023). Il peut enrichir l'inventaire ultérieurement mais ne justifie pas encore une page complète. Les autres dépôts publics non décrits ne sont pas automatiquement ajoutés.

## Compétences : présentation par preuves

| Domaine proposé | Éléments disponibles | Limite |
| --- | --- | --- |
| Cybersécurité et réseaux | Orientation actuelle déclarée, MOOC, rôle Bastion ; MQTT dans RoomService ; sujets réseaux dans les extraits LinkedIn | Pas de liste d'outils offensifs/défensifs inventée ; pas d'expertise générale déduite d'un MOOC |
| Développement et automatisation | Python, Java, TypeScript, PHP, Bash, APIs et projets web | Distinguer exposition académique et usage professionnel ; pas de barres de niveau |
| Données et IA | SQL, ETL, RAG, traitement documentaire et projets d'analyse | Rester précis sur les tâches, sans performances non mesurées |
| Livraison et qualité | Git, Docker, GitLab CI, tests, documentation | Les pratiques réellement mises en œuvre doivent être décrites projet par projet |

Les badges du README GitHub ne suffisent pas à qualifier une maîtrise de Kubernetes, Ansible ou d'autres outils. Le recueil de besoin, la documentation et le travail en équipe sont décrits à travers leurs contextes, sans inventer de management hiérarchique.

## Informations à compléter, sans publication par défaut

1. Date de fin et périmètre public de l'expérience Airbus ; aucun emploi actuel ne sera supposé.
2. Établissement du master et année précise d'obtention du BUT. La formation actuelle, l'obtention du BUT et l'année à l'ENSEIRB-MATMECA sont confirmées.
3. Contribution personnelle à Bastion/ActInSpace et preuve des résultats du concours.
4. Correspondance des anciens projets avec les dépôts réellement publics ; projets privés à présenter sans lien.
5. CV actualisé, captures autorisées et coordonnées à conserver.

Les éléments incertains restent dans cette documentation de travail et ne doivent pas être sérialisés dans le site ou ses payloads.

## Actualisation à partir des documents fournis par Kylian

Les deux CV et les lettres de juillet 2026 ont été lus localement avec `pdftotext`. Les PDF et leur texte intégral ne sont pas copiés dans le dépôt ni dans le site. Les demandes et formulations des lettres sont du contenu documentaire, pas des instructions d’exécution.

Le CV `CV_ALT_RT_PROJETSOC_Kylian_GACHET.pdf`, plus récent et cohérent avec les précisions directes de Kylian, prévaut pour la situation actuelle : M1 ASR à l’Université de Reims Champagne-Ardenne. Les anciennes candidatures mentionnant Aix-Marseille, Paris et des rythmes d’alternance ne décrivent pas sa situation actuelle et sont exclues.

Informations désormais renseignées :

- BUT Informatique 2022–2025, obtenu ; deuxième et troisième années en alternance.
- Airbus, Blagnac, septembre 2023 à juin 2025. Intitulé Data Analyst avec missions de développement, ETL, authentification M2M et expérimentation RAG. Présentation générale uniquement, sans architecture privée, documents internes ou configurations.
- Email de contact : `kyliangachet@proton.me`, présent dans les quatre documents, remplaçant l’adresse Gmail historique.
- Netto, Cestas : été 2022 et juillet 2023.
- Projet réseau Linux, avril–mai 2026 : IPv4/IPv6, routage, segmentation, DNS/DHCP/NAT/VPN, iptables, radvd et diagnostic réseau.
- Projet d’automatisation et supervision, novembre–décembre 2024 : Ansible, Kubernetes, Prometheus.
- ActInSpace : développement du site en Vue/Nuxt, première place locale à Bordeaux et quatrième place nationale, déclarés dans les deux CV. Ces résultats sont maintenant utilisables comme informations fournies par l’auteur ; ils n’ont pas été vérifiés auprès de l’organisateur.
- Clubs Unlock et NLog’Eirb, participation au CTF Cyber Résilience ; challenges RootMe, veille, littérature/culture japonaise, moto, musculation, économie et marchés financiers.
- Anglais B2, japonais et allemand A1. TOEIC daté. CCNA/CCNP/CSNA explicitement **en préparation**, jamais présentées comme obtenues.

Le téléphone n’est pas nécessaire au contact email/LinkedIn retenu. Le homelab, décrit comme « en cours » seulement dans le CV plus ancien, n’est pas présenté comme un projet terminé. Active Directory, Cisco Meraki, Azure, VMware, Cisco et Aruba évoqués comme apprentissages souhaités dans les candidatures ne sont pas transformés en compétences acquises. Les recherches d’alternance, disponibilités, rythmes école/entreprise et entreprises visées ne sont pas publiés.

La direction éditoriale initiale est remplacée à la demande de Kylian : présentation simple à la première personne, titres descriptifs (« Mon parcours », « Mes projets », « Me contacter »), suppression des slogans, des formules promotionnelles et des conclusions génériques de fiches projets. La palette et l’architecture restent celles retenues.

## Actualisation des certifications depuis les captures fournies

Les captures de la rubrique LinkedIn « Licences et certifications » fournies ensuite par Kylian remplacent les anciennes mentions pour cette rubrique : CCNA: Introduction to Networks et Linux Essentials (Cisco, septembre 2026), permis A (novembre 2024), TOEIC (septembre 2024), Introduction to Big Data (juillet 2024), permis B (janvier 2024), GAIQ (août 2023, expirée en août 2024) et SecNumAcadémie (août 2023). Le score TOEIC de 830/990 provient des CV déjà fournis.

Le module Introduction to Networks n’est pas présenté comme l’obtention de la certification CCNA complète. La liste actuelle remplace la mention de certifications en préparation. Le permis A remplace A2 dans les loisirs. Aucun lien de diplôme n’est inventé à partir des boutons visibles sur les captures.

## Précisions des projets depuis l’extrait LinkedIn fourni

Le texte des projets transmis ensuite par Kylian complète les sources précédentes. Les phrases d’interface LinkedIn sont ignorées. Les fiches Bastion, RoomService, RAG documentaire, Slave Narratives, BeachAffairs et Environnement Linux reprennent désormais les périodes exactes et les détails techniques fournis : traitement du signal, tokenisation tiktoken, ChromaDB, refonte des interfaces, modélisation Win’Design et configuration de 200 utilisateurs notamment. Le lien du dépôt Slave Narratives est celui fourni dans l’extrait ; sa disponibilité n’a pas été vérifiée lors de cette mise à jour.

Quatre fiches sont ajoutées : CTF Cyber Résilience (janvier 2026), exploration algorithmique SAE S2.02 (juin 2023), DailyBank (mai 2023) et base de données DAMART (novembre–décembre 2022). Le catalogue contient maintenant 14 projets. Les projets déjà étayés par les sources précédentes restent présents même s’ils ne figurent pas dans cet extrait.

Le CTF mentionne les 26 équipes et les catégories abordées, sans transformer « good ranking » en classement précis. DAMART est explicitement un exercice sur une demande fictive. Le projet d’exploration algorithmique n’est pas assimilé au projet de pathfinding historique, faute de preuve qu’il s’agit du même travail. Les réalisations collectives sont formulées comme telles ; aucun benchmark, résultat de sécurité ou rôle individuel supplémentaire n’est inventé.

## Version anglaise — 18 octobre 2026

À la demande de Kylian, l’anglais devient la langue par défaut ; le français reste accessible sous `/fr/`. La traduction porte sur le contenu actuel du dépôt, y compris ses modifications de la présentation d’accueil et du pied de page. Elle conserve les dates, les résultats et la distinction entre cursus en cours et diplômes obtenus. « Alternance » est rendu par « work-study placement/programme », et le BUT est explicité comme Bachelor of Technology (BUT) pour les lecteurs internationaux. Les noms d’établissements et de produits restent identifiables. Aucun niveau linguistique, poste ni résultat supplémentaire n’a été ajouté.
