import type { Project } from '~/types/content'

export const projects: Project[] = [
  {
    slug: 'bastion',
    number: '01',
    title: 'Bastion',
    subtitle: 'Projet d’équipe au concours ActInSpace.',
    year: '2026',
    category: 'Cybersécurité & réseaux',
    context: 'ENSEIRB-MATMECA · Janvier–avril 2026',
    description:
      'Un projet d’équipe sur la protection des communications spatiales, présenté au concours ActInSpace.',
    tags: ['Cybersécurité', 'Télécommunications', 'Spatial'],
    visual: 'orbit',
    featured: true,
    overview:
      'Avec mon équipe, j’ai participé à ActInSpace de janvier à avril 2026, un concours d’innovation spatiale coorganisé par le CNES et l’ESA. Nous avons proposé Bastion, un concept de protection des communications spatiales. Mon rôle dans l’équipe était consacré à la cybersécurité.',
    approach: [
      {
        title: 'Le sujet du concours',
        text: 'Nous avons travaillé sur le défi ADS5 proposé par Airbus : la défense des infrastructures orbitales face aux attaques électroniques, cyber et cinétiques.',
      },
      {
        title: 'Un travail d’équipe',
        text: 'Notre proposition associe traitement du signal, analyse de données et cybersécurité. L’équipe réunit des rôles dédiés aux radiofréquences, au logiciel, à la défense électronique, au développement du projet et à la cybersécurité.',
      },
      {
        title: 'Présentation et résultats',
        text: 'J’ai développé le site de présentation avec Vue.js, Nuxt 4 et Tailwind CSS. Notre équipe a terminé première au tour local de Bordeaux, puis quatrième au classement national.',
      },
    ],
    link: {
      label: 'Découvrir le site de Bastion',
      url: 'https://iamkylian.github.io/bastion-site/',
    },
  },
  {
    slug: 'roomservice',
    number: '02',
    title: 'RoomService',
    subtitle: 'Suivi de l’occupation des salles de l’IUT.',
    year: '2024',
    category: 'Cybersécurité & réseaux',
    context: 'IUT de Blagnac · Janvier–février 2024 · SAE S3.A.01',
    description:
      'Une chaîne de transmission MQTT et une application pour suivre l’occupation des salles, dans un environnement conteneurisé.',
    tags: ['MQTT', 'Docker', 'Python', 'SQL'],
    visual: 'network',
    featured: false,
    overview:
      'RoomService est un projet universitaire de suivi de l’occupation des salles de l’IUT de Blagnac. Il relie des données de capteurs à une interface de visualisation, avec MQTT pour les échanges et Docker pour le déploiement.',
    approach: [
      {
        title: 'Transporter les données',
        text: 'Les données des capteurs sont transmises en temps réel avec MQTT. La partie serveur utilise Python, et le back-end web repose sur PHP.',
      },
      {
        title: 'Rendre l’information lisible',
        text: 'L’interface est développée en HTML, CSS et JavaScript. Le travail sur la base comprend la création des relations, l’insertion des données des capteurs et les requêtes SQL avec SQL Developer.',
      },
      {
        title: 'Organiser le déploiement',
        text: 'La conteneurisation avec Docker structure l’environnement du projet et facilite son installation.',
      },
    ],
  },
  {
    slug: 'rag-documentaire',
    number: '03',
    title: 'RAG documentaire',
    subtitle: 'Mémoire et application de questions-réponses sur des PDF.',
    year: '2024',
    category: 'Développement & données',
    context: 'IUT de Blagnac · Novembre–décembre 2024',
    description:
      'Une étude du Retrieval-Augmented Generation accompagnée d’une application d’interrogation de documents PDF.',
    tags: ['Python', 'ChromaDB', 'LangChain', 'Ollama'],
    visual: 'documents',
    featured: false,
    overview:
      'Ce travail associe un mémoire sur le Retrieval-Augmented Generation à une application pratique. L’objectif : rechercher des passages pertinents dans des PDF pour apporter du contexte aux réponses d’un modèle de langage.',
    approach: [
      {
        title: 'Comprendre les mécanismes',
        text: 'Le mémoire retrace l’évolution des IA génératives et leurs limites. Il présente les notions d’ANI, d’AGI et d’ASI, puis revient sur les neurones artificiels, l’apprentissage, la régression linéaire et les bases probabilistes et statistiques.',
      },
      {
        title: 'Construire une chaîne documentaire',
        text: 'La démonstration utilise la tokenisation avec tiktoken et une base vectorielle ChromaDB. Le mémoire explique le découpage des documents, leur indexation et la similarité cosinus pour retrouver les passages utiles à une question.',
      },
      {
        title: 'Relier recherche et génération',
        text: 'Une API FastAPI et LangChain organisent les échanges avec Ollama pour l’inférence locale. Un client web permet d’utiliser la démonstration. Le mémoire examine aussi les avantages, les limites et les cas d’usage du RAG.',
      },
    ],
  },
  {
    slug: 'integration-continue',
    number: '04',
    title: 'Intégration continue',
    subtitle: 'Automatisation du build, des tests et du déploiement.',
    year: '2024',
    category: 'Systèmes & qualité',
    context: 'Projet universitaire · GitLab CI',
    description:
      'Un pipeline de compilation, de tests et de livraison, avec des environnements de test et de production distincts.',
    tags: ['GitLab CI', 'Docker', 'Git', 'Shell'],
    visual: 'pipeline',
    overview:
      'Ce projet universitaire porte sur l’automatisation du cycle de livraison d’une application existante : compilation, tests et déploiement. La configuration repose sur GitLab CI et des jobs organisés par étapes.',
    approach: [
      {
        title: 'Décomposer le pipeline',
        text: 'Les étapes de build, de test et de déploiement structurent les opérations et leurs dépendances.',
      },
      {
        title: 'Séparer les environnements',
        text: 'Des environnements distincts permettent de distinguer la validation de l’application de sa livraison.',
      },
      {
        title: 'Documenter le fonctionnement',
        text: 'La configuration YAML, les scripts et la documentation rendent le processus de livraison explicite.',
      },
    ],
  },
  {
    slug: 'slave-narratives',
    number: '05',
    title: 'Slave Narratives',
    subtitle: 'Application de recherche sur des récits historiques.',
    year: '2024',
    category: 'Développement & données',
    context: 'IUT de Blagnac · Septembre–novembre 2024 · SAE S5.A.01',
    description:
      'Une contribution collective à une application de visualisation de récits historiques et de parcours de vie.',
    tags: ['PHP', 'CodeIgniter', 'MariaDB', 'Zotero'],
    visual: 'map',
    overview:
      'Avec mon équipe, j’ai travaillé sur le site Slave Narratives des universités Toulouse – Jean Jaurès et Paul Sabatier. L’application cartographie des récits de personnes réduites en esclavage et leurs parcours de vie : lieux de naissance, de décès et de publication.',
    approach: [
      {
        title: 'Faire évoluer une application existante',
        text: 'L’application s’appuie sur CodeIgniter, une architecture MVC et MariaDB pour organiser les données et les traitements.',
      },
      {
        title: 'Faciliter l’exploration',
        text: 'Nous avons refondu les interfaces d’administration et de consultation et ajouté un moteur de recherche avancé pour explorer les récits et les parcours de vie.',
      },
      {
        title: 'Relier les ressources',
        text: 'L’intégration de l’API bibliographique Zotero et l’export PDF font partie des fonctionnalités travaillées collectivement.',
      },
    ],
    link: {
      label: 'Voir le dépôt GitHub',
      url: 'https://github.com/Iamkylian/sae-5-a-01-2024-2025-esclaves-rouge',
    },
  },
  {
    slug: 'coaching-sportif',
    number: '06',
    title: 'Coaching sportif',
    subtitle: 'Gestion des séances et des réservations d’un club.',
    year: '2025',
    category: 'Développement & données',
    context: 'Projet universitaire · Application web',
    description:
      'Une application de gestion de club : administration, API et interface pour les sportifs.',
    tags: ['Symfony', 'Angular', 'TypeScript', 'MySQL'],
    visual: 'network',
    overview:
      'Le projet propose une architecture composée d’un back-office pour les responsables et coachs, d’une API REST et d’une application destinée aux sportifs. Il couvre la gestion des séances, des exercices et des réservations.',
    approach: [
      {
        title: 'Organiser les responsabilités',
        text: 'Symfony et EasyAdmin servent le back-office, tandis qu’Angular porte l’interface des sportifs.',
      },
      {
        title: 'Modéliser les règles métier',
        text: 'Les réservations, annulations et validations demandent de traduire les usages du club en règles applicatives.',
      },
      {
        title: 'Relier les interfaces',
        text: 'L’API REST organise les échanges entre les composants. L’authentification utilise des jetons JWT.',
      },
    ],
  },
  {
    slug: 'beachaffairs',
    number: '07',
    title: 'BeachAffairs',
    subtitle: 'Analyse et modification d’une base de données.',
    year: '2023',
    category: 'Développement & données',
    context: 'IUT de Blagnac · Mai–juin 2023 · SAE S2.04',
    description:
      'Rétro-conception, modélisation et évolution d’une base de données relationnelle existante.',
    tags: ['SQL', 'Oracle SQL Developer', 'Win’Design', 'UML'],
    visual: 'database',
    overview:
      'BeachAffairs est un travail d’analyse et d’évolution d’une base de données. Il part d’un système existant pour en comprendre la structure et proposer un modèle répondant à de nouveaux besoins.',
    approach: [
      {
        title: 'Explorer l’existant',
        text: 'Nous avons reconstitué le schéma logique de la base existante, puis son schéma conceptuel avec Win’Design, accompagné d’un dictionnaire des données.',
      },
      {
        title: 'Faire évoluer le modèle',
        text: 'Nous avons conçu une nouvelle version pour corriger les défauts identifiés et répondre aux nouveaux besoins : diagramme de classes, dictionnaire des données et traduction en schéma relationnel.',
      },
      {
        title: 'Mettre en œuvre en SQL',
        text: 'Les scripts SQL-LDD et SQL-LMD transforment la structure et les données selon les nouvelles spécifications. Les requêtes SQL-LID permettent ensuite d’interroger la base avec Oracle SQL Developer.',
      },
    ],
  },
  {
    slug: 'environnement-linux',
    number: '08',
    title: 'Environnement Linux',
    subtitle: 'Installation d’une machine virtuelle Ubuntu.',
    year: '2022',
    category: 'Systèmes & qualité',
    context: 'IUT de Blagnac · Novembre–décembre 2022 · SAE S1.03',
    description:
      'La préparation d’un environnement de développement Ubuntu et l’automatisation de sa configuration.',
    tags: ['Ubuntu', 'Bash', 'VirtualBox'],
    visual: 'system',
    overview:
      'Ce projet consiste à configurer une machine virtuelle Ubuntu pour le développement. Il associe installation des outils, préparation d’un environnement multi-utilisateur et automatisation par scripts.',
    approach: [
      {
        title: 'Préparer l’environnement',
        text: 'Nous avons installé Ubuntu dans VirtualBox, puis Java, ProjectLibre, Asciidoctor et Terminator. Le partage du presse-papiers entre la machine hôte et la machine virtuelle a aussi été configuré.',
      },
      {
        title: 'Automatiser la configuration',
        text: 'Nous avons configuré 200 utilisateurs et écrit un script de test en Bash pour vérifier l’environnement.',
      },
      {
        title: 'Rendre l’installation reproductible',
        text: 'La documentation décrit les étapes de configuration et les vérifications réalisées. Nous avons présenté la machine virtuelle lors d’une soutenance.',
      },
    ],
  },
  {
    slug: 'infrastructure-reseau',
    number: '09',
    title: 'Réseau local Linux',
    subtitle: 'Configuration et administration d’un réseau local.',
    year: '2026',
    category: 'Cybersécurité & réseaux',
    context: 'Projet universitaire · Avril–mai 2026',
    description:
      'Configuration d’un réseau Linux en IPv4 et IPv6, de ses services et des règles de filtrage.',
    tags: ['Linux', 'IPv4 / IPv6', 'iptables', 'Wireshark'],
    visual: 'network',
    featured: true,
    overview:
      'En avril et mai 2026, j’ai conçu et administré un réseau local sous Linux. J’ai configuré l’adressage, le routage et la segmentation, puis installé et testé les services réseau.',
    approach: [
      {
        title: 'Configuration du réseau',
        text: 'Configuration manuelle et permanente des interfaces, adressage IPv4/IPv6, routage et segmentation. J’ai aussi mis en place l’auto-configuration IPv6 avec radvd.',
      },
      {
        title: 'Services et filtrage',
        text: 'Mise en place et tests de DNS, DHCP, NAT et VPN. Les règles iptables permettent de filtrer les flux et de gérer la traduction d’adresses.',
      },
      {
        title: 'Diagnostic',
        text: 'J’ai utilisé Wireshark, tcpdump, Nmap et Netcat pour analyser le trafic, vérifier les communications et rechercher les causes d’incidents dans le réseau du projet.',
      },
    ],
  },
  {
    slug: 'automatisation-supervision',
    number: '10',
    title: 'Automatisation & supervision',
    subtitle: 'Administration Linux avec Ansible, Kubernetes et Prometheus.',
    year: '2024',
    category: 'Systèmes & qualité',
    context: 'Projet universitaire · Novembre–décembre 2024',
    description:
      'Automatisation de tâches Linux, déploiement d’applications conteneurisées et suivi des métriques.',
    tags: ['Ansible', 'Kubernetes', 'Prometheus'],
    visual: 'pipeline',
    featured: true,
    overview:
      'Ce projet universitaire, réalisé sur deux semaines, portait sur l’automatisation et la supervision d’infrastructures. J’ai travaillé avec Ansible, Kubernetes et Prometheus.',
    approach: [
      {
        title: 'Playbooks Ansible',
        text: 'Écriture de playbooks pour automatiser des tâches d’administration sous Linux.',
      },
      {
        title: 'Déploiement Kubernetes',
        text: 'Déploiement et orchestration d’applications conteneurisées dans l’environnement du projet.',
      },
      {
        title: 'Supervision Prometheus',
        text: 'Suivi des métriques de l’infrastructure et détection d’anomalies avec Prometheus.',
      },
    ],
  },
  {
    slug: 'ctf-cyber-resilience',
    number: '11',
    title: 'CTF Cyber Résilience',
    subtitle: 'Compétition de cybersécurité à l’ENSEIRB-MATMECA.',
    year: '2026',
    category: 'Cybersécurité & réseaux',
    context: 'ENSEIRB-MATMECA · Janvier 2026',
    description:
      'Des épreuves de réseau, de forensique, de cryptographie et d’analyse de binaires, dans une compétition réunissant 26 équipes.',
    tags: ['Wireshark', 'Forensique', 'Cryptographie', 'Reverse engineering'],
    visual: 'network',
    overview:
      'J’ai participé au CTF organisé par la chaire Cyber Résilience des Infrastructures Numériques de l’ENSEIRB-MATMECA, en partenariat avec les forces armées en Nouvelle-Aquitaine. La compétition réunissait 26 équipes de militaires, de spécialistes cyber de la gendarmerie et d’élèves ingénieurs.',
    approach: [
      {
        title: 'Réseau et forensique',
        text: 'Les épreuves comprenaient l’analyse réseau et la recherche de traces numériques. J’ai notamment utilisé Wireshark pendant la compétition.',
      },
      {
        title: 'Cryptographie et binaires',
        text: 'Nous avons abordé des challenges de cryptographie autour de RSA et AES, de rétro-ingénierie et d’exploitation de binaires (Pwn).',
      },
      {
        title: 'Un cadre de compétition',
        text: 'Les challenges portaient sur l’identification et l’exploitation de vulnérabilités dans les environnements prévus pour le CTF, avec des situations proches de cas réels.',
      },
    ],
  },
  {
    slug: 'exploration-algorithmique',
    number: '12',
    title: 'Exploration algorithmique',
    subtitle: 'Comparaison et optimisation d’algorithmes.',
    year: '2023',
    category: 'Systèmes & qualité',
    context: 'IUT de Blagnac · Juin 2023 · SAE S2.02',
    description:
      'Comparaison d’algorithmes en Java et Python selon leur efficacité, leur simplicité et leur sobriété numérique.',
    tags: ['Java', 'Python', 'Codacy', 'SonarLint'],
    visual: 'pipeline',
    overview:
      'Ce projet consistait à optimiser et à comparer plusieurs algorithmes en Java et Python. Le travail portait à la fois sur leur fonctionnement et sur la qualité du code.',
    approach: [
      {
        title: 'Optimiser les algorithmes',
        text: 'Nous avons travaillé sur plusieurs implémentations en Java et Python pour les comparer et les améliorer.',
      },
      {
        title: 'Examiner la qualité du code',
        text: 'Codacy et SonarLint ont servi à analyser le code. L’évaluation prenait en compte l’efficacité, la simplicité et la sobriété numérique.',
      },
      {
        title: 'Justifier le classement',
        text: 'Un rapport final présente le classement des algorithmes pour chaque critère, avec les explications et les justifications de nos choix.',
      },
    ],
  },
  {
    slug: 'dailybank',
    number: '13',
    title: 'DailyBank',
    subtitle: 'Application de gestion de comptes clients.',
    year: '2023',
    category: 'Développement & données',
    context: 'IUT de Blagnac · Mai 2023 · SAE S2.01',
    description:
      'Une application Java reliée à une base Oracle, accompagnée d’une documentation et d’un cahier de recette.',
    tags: ['Java', 'Oracle Database', 'Tests', 'Documentation'],
    visual: 'database',
    overview:
      'DailyBank est un projet universitaire de développement d’une application Java-Oracle pour gérer des comptes clients. Le travail comprenait aussi la définition des besoins et la préparation des tests.',
    approach: [
      {
        title: 'Définir les besoins',
        text: 'Nous avons élaboré un cahier des charges utilisateurs pour préciser le fonctionnement attendu de l’application.',
      },
      {
        title: 'Développer et documenter',
        text: 'L’application a été développée en Java avec une base Oracle. Nous avons rédigé une documentation utilisateur et une documentation technique.',
      },
      {
        title: 'Préparer la recette',
        text: 'Un cahier de recette décrit les tests de l’application. Le projet a ensuite été présenté lors d’une soutenance.',
      },
    ],
  },
  {
    slug: 'base-donnees-damart',
    number: '14',
    title: 'Base de données DAMART',
    subtitle: 'Conception d’une base pour une demande fictive.',
    year: '2022',
    category: 'Développement & données',
    context: 'IUT de Blagnac · Novembre–décembre 2022 · SAE S1.04',
    description:
      'Un exercice de conception UML et de création d’une base SQL à partir de bons de commande.',
    tags: ['SQL', 'UML', 'Win’Design', 'Oracle SQL Developer'],
    visual: 'database',
    overview:
      'Dans ce projet universitaire, nous avons conçu une base de données à partir d’une demande fictive pour l’entreprise DAMART. Il s’agissait d’un exercice de cours, pas d’une mission réalisée pour l’entreprise.',
    approach: [
      {
        title: 'Concevoir le modèle',
        text: 'La structure de la base a été modélisée en UML avec Win’Design.',
      },
      {
        title: 'Créer et alimenter la base',
        text: 'Nous avons créé les relations en SQL avec SQL Developer, puis inséré les données issues des bons de commande.',
      },
      {
        title: 'Interroger les données',
        text: 'Des requêtes SQL permettent de consulter et d’exploiter les informations enregistrées dans la base.',
      },
    ],
  },
]
