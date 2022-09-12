import Image from 'next/image'
import { MyPokemonType } from '@types'
import { useMemo } from 'react'

import styles from '@styles/components/selected-pokemon.module.css'

interface Props {
    pokemon: MyPokemonType
}

export function SelectedPokemon({ pokemon }: Props) {
    const typeText = useMemo(
        () =>
            [...pokemon.types]?.reduce(
                (previusValue, currentValue) =>
                    previusValue
                        ? `${previusValue} | ${currentValue}`
                        : currentValue,
                ''
            ),
        [pokemon.types]
    )

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.wrapperImage}>
                    <Image
                        className={styles.pokemonImage}
                        width={150}
                        height={150}
                        alt={pokemon.name}
                        src={pokemon.sprite}
                    />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.information}>
                        <p className={styles.name}>{pokemon.name}</p>

                        <p>{`Types: ${typeText}`}</p>

                        <p>{`Level: ${pokemon.level}`}</p>
                        <p>{`XP: ${pokemon.xp}/100`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
