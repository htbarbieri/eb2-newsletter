export type ResourceAccent = 'green' | 'navy' | 'gold' | 'red'

export interface ResourceInstagram {
  handle: string
  /** Rótulo do botão, ex. "Edi" ou "Loja" */
  label?: string
}

export interface ResourceLink {
  nome: string
  url?: string
  descricao: string
  regiao?: string
  emBreve?: boolean
  whatsapp?: string
  /** Perfis Instagram (handle sem @) */
  instagrams?: ResourceInstagram[]
  /** Handle ou ID do canal YouTube (ex. edicars99) */
  youtube?: string
  /** Cor hex para contorno de destaque do card (ex. #820AD1) */
  corDestaque?: string
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
