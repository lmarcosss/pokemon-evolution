import type { NextApiRequest, NextApiResponse } from 'next'

import type { ErrorType } from '@types'
import { ApiUrlsEnum, StatusCodeEnum } from '@enums'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetch(`${ApiUrlsEnum.POKEMON_API}/pokedex.json`)

    const pokemons = (await data.json()) as {
      id: number
      name: { english: string }
      image: {
        sprite: string
        thumbnail: string
        hires: string
      }
    }[]

    const pokemon = pokemons.find(
      (pokemon) => pokemon.id === Number(req.query.id)
    )

    res.status(StatusCodeEnum.SUCCESS).json(pokemon)
  } catch (error) {
    const errorApi = error as ErrorType

    const statusCode =
      errorApi.response?.status && Number.isInteger(errorApi.response.status)
        ? errorApi.response.status
        : 500

    res.status(statusCode).json({
      ...errorApi,
    })
  }
}
