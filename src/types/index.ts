export interface PokemonResponseType {
  0: PokemonType
}

export interface PokemonType {
  id: number
  name: {
    english: string
    japanese: string
    chinese: string
    french: string
  }
  type: string[]
  base: {
    HP: number
    Attack: number
    Defense: number
    'Sp. Attack': number
    'Sp. Defense': number
    Speed: number
  }
  species: string
  description: string
  evolution: {
    next: [string, string][]
  }
  profile: {
    height: string
    weight: string
    egg: string[]
    ability: [string, string][]
    gender: string
  }
  image: {
    sprite: string
    thumbnail: string
    hires: string
  }
}

export interface ErrorType {
  message: string
  status: number
  response: {
    status: number
    data: {
      error: number
      message: string
    }
  }
}

export interface MyPokemonType extends PokemonType {
  level: number
  xp: number
}

export interface SelectedPokemonType extends PokemonType {
  isPokemonByCode?: boolean
}

export interface MissionType {
  id: string
  title: string
  time: number
  xp: number
}
