import { useMemo } from 'react'
import { CookiesKeysEnum } from '@enums'
import api from 'src/services'
import { MyPokemonType, PokemonType } from '@types'
import { GetServerSidePropsContext } from 'next'
import { BasePage, Button } from '@components'
import Image from 'next/image'

import styles from '@styles/pages/adventure.module.css'

interface Props {
    myPokemon: PokemonType & MyPokemonType
}

const missions = [
    {
        title: 'Rest and eat good food',
        time: 10,
        xp: 10,
    },
    {
        title: 'Run in the woods',
        time: 20,
        xp: 20,
    },
    {
        title: 'Find fruits',
        time: 30,
        xp: 30,
    },
    {
        title: 'Search new enemies',
        time: 40,
        xp: 40,
    },
    {
        title: 'Battle to wild pokemon',
        time: 50,
        xp: 50,
    },
    {
        title: 'Battle to Team Rocket',
        time: 60,
        xp: 60,
    },
]

export default function Adventure({ myPokemon }: Props) {
    const typeText = useMemo(
        () =>
            [...myPokemon.types]?.reduce(
                (previusValue, currentValue) =>
                    previusValue
                        ? `${previusValue} | ${currentValue}`
                        : currentValue,
                ''
            ),
        [myPokemon.types]
    )

    return (
        <BasePage>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.wrapperImage}>
                            <Image
                                className={styles.pokemonImage}
                                width={150}
                                height={150}
                                alt={myPokemon.name}
                                src={myPokemon.sprite}
                            />
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.information}>
                                <p className={styles.name}>{myPokemon.name}</p>

                                <p>{`Types: ${typeText}`}</p>

                                <p>{`Level: ${myPokemon.level}`}</p>
                                <p>{`XP: ${myPokemon.xp}/100`}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.missionCard}>
                    <p className={styles.titleMissionCard}>Missions:</p>

                    {missions.map((mission, index) => (
                        <div
                            key={mission.title}
                            className={`
                                ${styles.mission}
                                ${index % 2 !== 0 && styles.evenMission}
                            `}
                        >
                            <div>
                                <p>{mission.title}</p>
                                <p>Time: {mission.time}</p>
                                <p>XP: {mission.xp}</p>
                            </div>

                            <Button>Play</Button>
                        </div>
                    ))}
                </div>
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
