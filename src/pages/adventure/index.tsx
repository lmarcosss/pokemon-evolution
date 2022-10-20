import { useEffect, useMemo, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { CookiesKeysEnum, ErrorMessagesEnum, StatusCodeEnum } from '@enums'
import { ErrorType, MissionType, MyPokemonType, PokemonType } from '@types'
import { BasePage, MissionsCard, SelectedPokemon } from '@components'
import { missions } from '@data'
import { useCountdown } from '@hooks'
import { transformSecondsToMilliseconds } from '@utils'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import api from 'src/services'

import styles from '@styles/pages/adventure.module.css'

interface MyPokemonAdventureType extends PokemonType, MyPokemonType {}

interface SelectedMissionType extends MissionType {
  missionEndsAt?: Date
}

const MAX_EXP = 100

export default function Adventure() {
  const [selectedMission, setSelectedMission] = useState<SelectedMissionType>()
  const [myPokemon, setMyPokemon] = useState<MyPokemonAdventureType>()
  const [cookies, setCookies, removeCookie] = useCookies([
    CookiesKeysEnum.SELECTED_MISSION,
    CookiesKeysEnum.MY_POKEMON,
  ])

  const selectedDate = useMemo(() => {
    if (selectedMission?.missionEndsAt) {
      return new Date(selectedMission.missionEndsAt)
    }

    return undefined
  }, [selectedMission])

  const [seconds] = useCountdown(selectedDate)

  function getMissionEndsAt(time: number) {
    const currentDate = new Date()
    const secondsDelay = 2

    const secondsToMiliSeconds = transformSecondsToMilliseconds(
      time + secondsDelay
    )

    currentDate.setTime(currentDate.getTime() + secondsToMiliSeconds)

    return currentDate
  }

  function onClickMission(selectedMission?: MissionType) {
    setCookies(
      CookiesKeysEnum.SELECTED_MISSION,
      !!selectedMission?.time
        ? {
            ...selectedMission,
            missionEndsAt: getMissionEndsAt(selectedMission.time),
          }
        : ''
    )
  }

  useEffect(() => {
    if (!myPokemon || cookies.myPokemon?.xp !== myPokemon.xp) {
      setMyPokemon(cookies.myPokemon)
    }
  }, [cookies.myPokemon, myPokemon])

  useEffect(() => {
    if (cookies.selectedMission) {
      setSelectedMission(cookies.selectedMission)
    }
  }, [cookies.selectedMission, selectedMission])

  async function getPokemonEvolution(pokemon: MyPokemonAdventureType) {
    try {
      const pokemonEvolutionName =
        pokemon.family.evolutionLine[
          pokemon.family.evolutionStage
        ].toLowerCase()

      const { data: newPokemon } = await api.get<PokemonType>('/pokemon', {
        params: { id: pokemonEvolutionName },
      })

      toast.success(
        `Contratulation! Your pokemon evolved to ${newPokemon.name}`,
        {
          theme: 'colored',
        }
      )

      setCookies(CookiesKeysEnum.MY_POKEMON, {
        ...pokemon,
        ...newPokemon,
      })
    } catch (error) {
      const errorApi = error as ErrorType

      const errorMessage =
        errorApi.response.status === StatusCodeEnum.NOT_FOUND
          ? ErrorMessagesEnum.POKEMON_NOT_FOUND
          : errorApi?.message

      toast.error(errorMessage || ErrorMessagesEnum.UNEXPECTED_ERROR, {
        theme: 'colored',
      })
    }
  }

  useEffect(() => {
    if (cookies.selectedMission && selectedMission && seconds <= 0) {
      setSelectedMission(undefined)
      removeCookie(CookiesKeysEnum.SELECTED_MISSION)

      toast.success(`Mission Completed! You earn ${selectedMission.xp} xp.`, {
        theme: 'colored',
      })

      const experienceAmount = cookies?.myPokemon.xp + selectedMission.xp

      const experienceRest = experienceAmount % MAX_EXP

      const level =
        experienceAmount >= MAX_EXP
          ? cookies?.myPokemon.level + 1
          : cookies?.myPokemon.level

      const pokemon = {
        ...cookies?.myPokemon,
        level,
        xp: experienceAmount >= MAX_EXP ? experienceRest : experienceAmount,
      }

      const hasEvolution = pokemon.family.evolutionLine.length > 1
      const firstEvolutionStage =
        level === 3 && pokemon.family.evolutionStage === 1
      const secondEvolutionStage =
        level === 5 && pokemon.family.evolutionStage === 2

      if (hasEvolution && (firstEvolutionStage || secondEvolutionStage)) {
        getPokemonEvolution(pokemon)
      } else {
        setCookies(CookiesKeysEnum.MY_POKEMON, pokemon)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.selectedMission, seconds, removeCookie])

  return (
    <BasePage>
      <div className={styles.container}>
        <SelectedPokemon pokemon={myPokemon} />
        <MissionsCard
          onClick={onClickMission}
          missions={missions}
          seconds={seconds}
          selectedMission={selectedMission}
        />
      </div>
    </BasePage>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookie = req.cookies[CookiesKeysEnum.MY_POKEMON]
  const pokemonCookieInfo: Partial<MyPokemonType> = cookie && JSON.parse(cookie)

  if (!pokemonCookieInfo?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
