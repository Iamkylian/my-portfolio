export const profile = {
  name: 'Kylian Gachet',
  email: 'kyliangachet@proton.me',
  github: 'https://github.com/Iamkylian',
  linkedin: 'https://www.linkedin.com/in/kyliangachet/',
}

export const education = [
  {
    date: 'DEPUIS SEPT. 2026',
    title: 'Master Réseaux & Télécommunications',
    place: 'Université de Reims Champagne-Ardenne · M1 ASR',
    text: 'Je suis le parcours Administration et Sécurité des Réseaux, à Reims.',
    current: true,
  },
  {
    date: '2025 — 2026',
    title: 'Première année en télécommunications',
    place: 'ENSEIRB-MATMECA · Talence',
    text: 'J’y ai étudié les réseaux, les télécommunications et le traitement du signal. J’ai aussi participé aux clubs Unlock et NLog’Eirb et au CTF Cyber Résilience.',
    current: false,
  },
  {
    date: '2022 — 2025',
    title: 'BUT Informatique · diplôme obtenu',
    place: 'IUT de Blagnac · Université Toulouse – Jean Jaurès',
    text: 'Formation en développement, bases de données, systèmes et réseaux. J’ai effectué mes deuxième et troisième années en alternance chez Airbus.',
    current: false,
  },
  {
    date: '2019 — 2022',
    title: 'Baccalauréat général',
    place: 'Lycée Pape Clément · Pessac',
    text: 'Spécialités Numérique et Sciences Informatiques et LLCER anglais.',
    current: false,
  },
]

export const qualifications = [
  {
    year: 'SEPTEMBRE 2026',
    title: 'CCNA: Introduction to Networks',
    organization: 'Cisco',
    detail: 'Module Introduction to Networks du parcours CCNA.',
  },
  {
    year: 'SEPTEMBRE 2026',
    title: 'Linux Essentials',
    organization: 'Cisco',
    detail: 'Formation aux fondamentaux de Linux.',
  },
  {
    year: 'NOVEMBRE 2024',
    title: 'Permis de conduire · Catégorie A',
    organization: 'France Titres · ANTS',
    detail: 'Permis moto.',
  },
  {
    year: 'SEPTEMBRE 2024',
    title: 'TOEIC',
    organization: 'ETS',
    detail: 'Test of English for International Communication · résultat : 830 / 990.',
  },
  {
    year: 'JUILLET 2024',
    title: 'Introduction to Big Data',
    organization: 'UC San Diego · Coursera',
    detail: 'Formation aux concepts et technologies du Big Data',
  },
  {
    year: 'JANVIER 2024',
    title: 'Permis de conduire · Catégorie B',
    organization: 'France Titres · ANTS',
    detail: 'Permis voiture.',
  },
  {
    year: 'AOÛT 2023',
    title: 'Google Analytics Individual Qualification (GAIQ)',
    organization: 'Google Analytics 4',
    detail: '',
  },
  {
    year: 'AOÛT 2023',
    title: 'MOOC SecNumAcadémie',
    organization: 'ANSSI',
    detail: 'Formation aux fondamentaux de la cybersécurité',
  },
]

export const skills = [
  {
    title: 'Systèmes et réseaux',
    text: 'Linux (Ubuntu), IPv4/IPv6, routage, VLAN, DNS, DHCP, NAT, VPN et SSH. Configuration de réseaux locaux et diagnostic avec Wireshark, tcpdump, Nmap et Netcat.',
    tags: ['Linux', 'IPv4 / IPv6', 'Wireshark', 'iptables'],
    project: 'infrastructure-reseau',
    link: 'Mon projet de réseau local',
  },
  {
    title: 'Automatisation et supervision',
    text: 'Scripts Bash et Python, playbooks Ansible, conteneurs Docker, déploiement sous Kubernetes et suivi des métriques avec Prometheus. Utilisation de Git et GitLab CI pour les projets.',
    tags: ['Ansible', 'Docker', 'Kubernetes', 'Prometheus'],
    project: 'automatisation-supervision',
    link: 'Mon projet d’automatisation',
  },
  {
    title: 'Développement et données',
    text: 'Python, C, Java, SQL et développement web avec TypeScript, Vue, Angular et Symfony. Chez Airbus, j’ai travaillé sur des flux ETL, des API et l’authentification entre applications.',
    tags: ['Python', 'SQL', 'TypeScript', 'OAuth 2.0 / PKI'],
    project: 'rag-documentaire',
    link: 'Mon projet RAG',
  },
]

export const interests = [
  {
    title: 'CTF et veille',
    text: 'Je participe à des challenges sur RootMe et je suis l’actualité des réseaux et de la cybersécurité.',
  },
  {
    title: 'Culture japonaise',
    text: 'Je m’intéresse à la littérature et à la culture japonaises, et j’apprends le japonais.',
  },
  {
    title: 'Moto et musculation',
    text: 'Je pratique la musculation et je m’intéresse à la moto. Je suis titulaire des permis A et B.',
  },
  { title: 'Économie', text: 'Je suis aussi l’actualité économique et les marchés financiers.' },
]
