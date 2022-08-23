import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

import type { ErrorType, PokemonResponseType } from '@types'
import { ApiUrlsEnum, ErrorMessages, StatusCodeEnum } from '@enums'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const http = axios.create({
            baseURL: ApiUrlsEnum.POKEMON_API,
        })

        const { data } = await http.get<PokemonResponseType>(`/${req.query.id}`)

        res.status(StatusCodeEnum.SUCCESS).json({ ...data[0] })
    } catch (error) {
        const errorApi = error as ErrorType

        if (errorApi.response.data.error === StatusCodeEnum.NOT_FOUND) {
            res.status(StatusCodeEnum.NOT_FOUND).json({
                message: ErrorMessages.POKEMON_NOT_FOUND,
            })
        }

        res.status(errorApi.response.data.error).json({
            message: errorApi.response.data.message,
        })
    }
}
