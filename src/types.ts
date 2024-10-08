export interface Character {
  id: number
  name: string
  class: string
  health: number
  attack: number
  defense: number
}

export interface Quest {
  id: number
  name: string
  monsterElement: string
  monsterTrophy: string
  isUnlocked: boolean
  isCompleted: boolean
  isExpired: boolean
}

export interface Resource {
  id: number
  name: string
  quantity: number
}