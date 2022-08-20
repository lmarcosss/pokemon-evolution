// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorType, PokemonResponseType } from '@types'
import axios from 'axios'
import { ApiUrlsEnum } from '@enums'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const http = axios.create({
            baseURL: ApiUrlsEnum.POKEMON_API,
        })

        const { data } = await http.get<PokemonResponseType>(`/${req.query.id}`)

        res.status(200).json({ ...data[0] })
    } catch (error) {
        const { response } = error as ErrorType

        res.status(response.data.error).json({
            message: response.data.message,
        })
    }
}
