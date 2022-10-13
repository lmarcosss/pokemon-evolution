import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import type { ErrorType, PokemonResponseType } from '@types'
import { ApiUrlsEnum, StatusCodeEnum } from '@enums'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const http = axios.create({
      baseURL: ApiUrlsEnum.POKEMON_API,
    })

    const { data } = await http.get<PokemonResponseType>(`/${req.query.id}`, {
      headers: {
        'User-Agent':
          'Pokemon Evolution (https://pokemon-evolution.vercel.app/, 1.0.0)',
      },
    })

    res.status(StatusCodeEnum.SUCCESS).json({ ...data[0] })
  } catch (error) {
    const errorApi = error as ErrorType

    res.status(errorApi.response.data.error).json({
      message: errorApi.response.data.message,
    })
  }
}
