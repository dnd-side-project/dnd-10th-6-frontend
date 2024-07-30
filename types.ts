export type WikiType = 'NAMUI' | 'ROMANCE'
export const wikiTypeList = ['NAMUI', 'ROMANCE'] as const

export type PropswithWikiType<P = object> = {
  wikiType: WikiType
} & P
