export interface PokemonResponseType {
  0: PokemonType
}

export interface PokemonType {
  number: string
  name: string
  types: string[]
  height: string
  weight: string
  family: {
    evolutionStage: number
    evolutionLine: string[]
  }
  starter: boolean
  sprite: string
  description: string
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
  id: string
  name: string
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
