import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCookies } from 'react-cookie'
import { BasePage, Button, CodeModal } from '@components'
import {
    ErrorType,
    MyPokemonType,
    PokemonType,
    SelectedPokemonType,
} from '@types'
import {
    CookiesKeysEnum,
    ErrorMessagesEnum,
    PokemonNumberEnum,
    StatusCodeEnum,
} from '@enums'
import api from 'src/services'
import { toast } from 'react-toastify'

import styles from '@styles/pages/home.module.css'

interface Props {
    pokemonsAPI: PokemonType[]
}

function Home({ pokemonsAPI = [] }: Props) {
    const [selectedPokemon, setSelectedPokemon] =
        useState<SelectedPokemonType | null>(null)
    const [pokemons, setPokemons] = useState<SelectedPokemonType[]>(pokemonsAPI)
    const router = useRouter()
    const [choosedPokemon, setChoosedPokemon] = useCookies([
        CookiesKeysEnum.MY_POKEMON,
    ])

    const [isVisible, setVisible] = useState(false)

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

    function onCloseModal() {
        setVisible(false)
    }

    function onOpenModal() {
        setVisible(true)
    }

    async function onSubmitCode(code: string) {
        try {
            const { data: newPokemon } = await api.get<PokemonType>(
                '/pokemon',
                {
                    params: { id: code },
                }
            )

            setPokemons([{ ...newPokemon, isPokemonByCode: true }])
        } catch (error) {
            const errorApi = error as ErrorType

            const errorMessage =
                errorApi.response.status === StatusCodeEnum.NOT_FOUND
                    ? ErrorMessagesEnum.POKEMON_NOT_FOUND
                    : errorApi?.message

            toast.error(errorMessage || ErrorMessagesEnum.UNEXPECTED_ERROR, {
                theme: 'colored',
            })
        } finally {
            onCloseModal()
        }
    }

    return (
        <BasePage>
            <div className={styles.chooseOurPokemonScreen}>
                <span className={styles.title}>
                    Escolha
                    <span onClick={onOpenModal}> seu </span>
                    Pokémon
                </span>

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

            <CodeModal
                onCloseModal={onCloseModal}
                isVisible={isVisible}
                onSubmit={onSubmitCode}
            />
        </BasePage>
    )
}

function loadStarterPokemons() {
    const pokemons = [
        PokemonNumberEnum.BULBASAUR,
        PokemonNumberEnum.CHARMANDER,
        PokemonNumberEnum.SQUIRTLE,
    ].map(async (id) => {
        const { data } = await api.get<PokemonType>('/pokemon', {
            params: { id },
        })

        return data
    })

    return Promise.all(pokemons)
}

export async function getStaticProps() {
    const pokemonsAPI = await loadStarterPokemons()

    return {
        props: {
            pokemonsAPI,
        },
    }
}

export default Home
