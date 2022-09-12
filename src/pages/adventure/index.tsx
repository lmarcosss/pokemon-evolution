import { GetServerSidePropsContext } from 'next'
import { CookiesKeysEnum } from '@enums'
import { MyPokemonType, PokemonType } from '@types'
import { BasePage, MissionsCard, SelectedPokemon } from '@components'
import { missions } from '@data'
import api from 'src/services'

import styles from '@styles/pages/adventure.module.css'

interface Props {
    myPokemon: PokemonType & MyPokemonType
}

export default function Adventure({ myPokemon }: Props) {
    return (
        <BasePage>
            <div className={styles.container}>
                <SelectedPokemon pokemon={myPokemon} />
                <MissionsCard missions={missions} />
            </div>
        </BasePage>
    )
}

async function loadMyPokemonInfo(id: string) {
    const { data } = await api.get<PokemonType>('/pokemon', {
        params: { id },
    })

    return data
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    const cookie = req.cookies[CookiesKeysEnum.MY_POKEMON]
    const pokemonCookieInfo: Partial<MyPokemonType> =
        cookie && JSON.parse(cookie)

    if (!pokemonCookieInfo?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    try {
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
            props: {
                redirect: {
                    destination: '/500',
                    permanent: false,
                },
            },
        }
    }
}
