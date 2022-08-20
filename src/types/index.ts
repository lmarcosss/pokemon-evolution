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
    response: {
        data: {
            error: number
            message: string
        }
    }
}
