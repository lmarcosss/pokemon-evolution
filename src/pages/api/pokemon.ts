import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import type { ErrorType, PokemonResponseType } from '@types'
import { ApiUrlsEnum, StatusCodeEnum } from '@enums'
import packageInfo from '../../../package.json'

const PROJECT_URL = 'https://pokemon-evolution.vercel.app'
const PROJECT_NAME = 'Pokemon Evolution'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const http = axios.create({
      baseURL: ApiUrlsEnum.POKEMON_API,
    })

    const { data } = await http.get<PokemonResponseType[]>(`/${req.query.id}`, {
      headers: {
        'User-Agent': `${PROJECT_NAME} (${PROJECT_URL}, ${packageInfo?.version})`,
      },
    })

    const [pokemon] = data

    const id = String(req.query.id).padStart(3, '0')
    const sprite = `${process.env.NEXT_PUBLIC_POKEMON_IMAGES}/${id}.png`

    res.status(StatusCodeEnum.SUCCESS).json({ ...pokemon, sprite })
  } catch (error) {
    const errorApi = error as ErrorType

    res.status(errorApi.response.data.error).json({
      message: errorApi.response.data.message,
    })
  }
}
