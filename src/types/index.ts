export interface PokemonResponseType {
    0: PokemonType
}

export interface PokemonType {
    number: string
    name: string
    type: string[]
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
        data: {
            error: number
            message: string
        }
    }
}

export interface MyPokemonType {
    id: string
    name: string
    level: number
    xp: number
}
