import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BasePage, Button } from '@components'
import { MyPokemonType, PokemonType } from '@types'
import { CookiesKeysEnum, PokemonNumberEnum } from '@enums'
import api from '../services'

import styles from '@styles/pages/home.module.css'
import { useCookies } from 'react-cookie'

interface Props {
    pokemons: PokemonType[]
}

function Home({ pokemons = [] }: Props) {
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(
        null
    )
    const router = useRouter()
    const [choosedPokemon, setChoosedPokemon] = useCookies([
        CookiesKeysEnum.MY_POKEMON,
    ])

    useEffect(() => {
        if (!Object.keys(choosedPokemon)) {
            router.replace('/adventure')
        }
    }, [choosedPokemon, router])

    function onPlayGame() {
        const pokemon = {
            id: selectedPokemon?.number,
            name: selectedPokemon?.name,
            level: 1,
            xp: 0,
        } as MyPokemonType

        setChoosedPokemon(CookiesKeysEnum.MY_POKEMON, pokemon)
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
    // const pokemons = [
    //     PokemonNumberEnum.BULBASAUR,
    //     PokemonNumberEnum.CHARMANDER,
    //     PokemonNumberEnum.SQUIRTLE,
    // ].map(async (id) => {
    //     const { data } = await api.get<PokemonType>('/pokemon', {
    //         params: { id },
    //     })

    //     return data
    // })

    return Promise.all([])
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
