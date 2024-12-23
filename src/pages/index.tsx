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
import { GetServerSideProps } from 'next'

import styles from '@styles/pages/home.module.css'

interface Props {
  pokemonsAPI: PokemonType[]
  errorMessage?: string
}

function Home({ pokemonsAPI, errorMessage }: Readonly<Props>) {
  const [selectedPokemon, setSelectedPokemon] =
    useState<SelectedPokemonType | null>(null)
  const [pokemons, setPokemons] = useState<SelectedPokemonType[]>(
    pokemonsAPI || []
  )
  const router = useRouter()
  const [, setChoosedPokemon] = useCookies([CookiesKeysEnum.MY_POKEMON])
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        theme: 'colored',
      })
    }
  }, [errorMessage])

  function onPlayGame() {
    const pokemon = {
      ...selectedPokemon,
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
      const { data: newPokemon } = await api.get<PokemonType>('/pokemon', {
        params: { id: code },
      })

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
          Choose <span onClick={onOpenModal}>your</span> Pokémon
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
          Go Play
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.cookies[CookiesKeysEnum.MY_POKEMON]
  const pokemonCookieInfo: Partial<MyPokemonType> = cookie && JSON.parse(cookie)

  if (pokemonCookieInfo?.id) {
    return {
      redirect: {
        destination: '/adventure',
        permanent: false,
      },
    }
  }

  try {
    const pokemonsAPI = await loadStarterPokemons()

    return {
      props: {
        pokemonsAPI,
      },
    }
  } catch (error) {
    return {
      props: {
        pokemonsAPI: [],
        errorMessage: ErrorMessagesEnum.UNEXPECTED_ERROR,
      },
    }
  }
}

export default Home
