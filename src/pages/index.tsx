import { BasePage } from './_base-page'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { useLocalStorage } from '@hooks'
import { Button } from '@components'
import { PokemonType } from '@types'
import { ApiUrlsEnum, LocalStorageKeysEnum, PokemonNumberEnum } from '@enums'

import styles from '@styles/pages/home.module.css'

interface Props {
    pokemons: PokemonType[]
}

function Home({ pokemons = [] }: Props) {
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(
        null
    )
    const { setItem, getItem } = useLocalStorage()
    const router = useRouter()

    useEffect(() => {
        const pokemon = getItem(LocalStorageKeysEnum.CHOOSED_POKEMON)

        if (pokemon) {
            router.replace('/adventure')
        }
    }, [getItem, router])

    function onPlayGame() {
        const pokemon = {
            id: selectedPokemon?.number,
            name: selectedPokemon?.name,
            level: 1,
            xp: 0,
        }

        setItem(LocalStorageKeysEnum.CHOOSED_POKEMON, pokemon)
        router.replace('/adventure')
    }

    return (
        <BasePage>
            <div className={styles.chooseOurPokemonScreen}>
                <span className={styles.title}>Escolha seu Pokémon</span>

                <div className={styles.containerPokemons}>
                    {pokemons.map((pokemon) => (
                        <Button
                            key={pokemon.name}
                            onClick={() => setSelectedPokemon(pokemon)}
                            className={
                                pokemon.name === selectedPokemon?.name
                                    ? styles.selectedPokemon
                                    : undefined
                            }
                        >
                            <Image
                                width={200}
                                height={200}
                                alt={`Pokemon ${pokemon.name}`}
                                src={pokemon.sprite}
                            />
                        </Button>
                    ))}
                </div>

                <Button
                    disabled={!selectedPokemon}
                    onClick={onPlayGame}
                    className={styles.play}
                >
                    Bora Jogar
                </Button>
            </div>
        </BasePage>
    )
}

function loadStarterPokemons() {
    const http = axios.create({
        baseURL: `${ApiUrlsEnum.NEXT_API}/pokemon`,
    })

    const pokemons = [
        PokemonNumberEnum.BULBASAUR,
        PokemonNumberEnum.CHARMANDER,
        PokemonNumberEnum.SQUIRTLE,
    ].map(async (id) => {
        const { data } = await http.get<PokemonType>('', {
            params: { id },
        })

        return data
    })

    return Promise.all(pokemons)
}

export async function getStaticProps() {
    const pokemons = await loadStarterPokemons()

    return {
        props: {
            pokemons,
        },
    }
}

export default Home
