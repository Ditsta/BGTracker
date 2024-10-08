export interface Character {
  id: number
  name: string
  class: string
  materials: { name: string; amount: number }[]
  plants: { name: string; amount: number }[]
  elements: { name: string; amount: number }[]
  skills: { name: string; isLearned: boolean }[]
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