import { CookiesKeysEnum } from '@enums'
import api from '../../services'
import { MyPokemonType, PokemonType } from '@types'
import { GetServerSidePropsContext } from 'next'
import { BasePage } from '@components'

interface Props {
    myPokemon: PokemonType
}

export default function Adventure({}: Props) {
    return (
        <BasePage>
            <div>Aventura</div>
        </BasePage>
    )
}

async function loadMyPokemonInfo(id: string) {
    // const { data } = await api.get<PokemonType>('/pokemon', {
    //     params: { id },
    // })

    return {}
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    const cookie = req.cookies[CookiesKeysEnum.MY_POKEMON]
    const pokemonCookieInfo: Partial<MyPokemonType> =
        cookie && JSON.parse(cookie)

    try {
        if (!pokemonCookieInfo?.id) throw Error

        const myPokemonInfoAPI = await loadMyPokemonInfo(pokemonCookieInfo.id)

        return {
            props: {
                myPokemon: {
                    ...myPokemonInfoAPI,
                    ...pokemonCookieInfo,
                },
            },
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}
