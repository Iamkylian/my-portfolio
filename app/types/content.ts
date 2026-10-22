export type ProjectCategory =
  'Cybersécurité & réseaux' | 'Développement & données' | 'Systèmes & qualité'
export type ProjectVisual =
  'orbit' | 'network' | 'documents' | 'pipeline' | 'map' | 'database' | 'system'
export interface Project {
  slug: string
  number: string
  title: string
  subtitle: string
  year: string
  category: ProjectCategory
  context: string
  description: string
  tags: string[]
  visual: ProjectVisual
  featured?: boolean
  overview: string
  approach: { title: string; text: string }[]
  link?: { label: string; url: string }
}
