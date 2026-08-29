export type ResourceAccent = 'green' | 'navy' | 'gold' | 'red'

export interface ResourceLink {
  nome: string
  url?: string
  descricao: string
  regiao?: string
  emBreve?: boolean
}

export interface ResourceCategory {
  id: string
  titulo: string
  descricao: string
  accent: ResourceAccent
  links: ResourceLink[]
}

import data from './recursos.json'

export const resourceCategories = data.categories as ResourceCategory[]
