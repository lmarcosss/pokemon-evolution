import { SelectedPokemon } from '@components'
import { render, screen } from '@testing-library/react'
import { MyPokemonType } from '@types'
import '@testing-library/jest-dom'

const pokemon = {
  id: 155,
  name: {
    english: 'Cyndaquil',
    japanese: 'ヒノアラシ',
    chinese: '火球鼠',
    french: 'Héricendre',
  },
  type: ['Fire'],
  base: {
    HP: 39,
    Attack: 52,
    Defense: 43,
    'Sp. Attack': 60,
    'Sp. Defense': 50,
    Speed: 65,
  },
  species: 'Fire Mouse Pokémon',
  description:
    'Cyndaquil protects itself by flaring up the flames on its back. The flames are vigorous if the Pokémon is angry. However, if it is tired, the flames splutter fitfully with incomplete combustion.',
  evolution: { next: ['156', 'Level 14'] },
  profile: {
    height: '0.5 m',
    weight: '7.9 kg',
    egg: ['Field'],
    ability: [
      ['Blaze', 'false'],
      ['Flash Fire', 'true'],
    ],
    gender: '87.5:12.5',
  },
  image: {
    sprite:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/sprites/155.png',
    thumbnail:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/155.png',
    hires:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/155.png',
  },
  level: 1,
  xp: 0,
} as MyPokemonType

const pokemonWithTwoTypes = {
  id: 3,
  name: {
    english: 'Venusaur',
    japanese: 'フシギバナ',
    chinese: '妙蛙花',
    french: 'Florizarre',
  },
  type: ['Grass', 'Poison'],
  base: {
    HP: 80,
    Attack: 82,
    Defense: 83,
    'Sp. Attack': 100,
    'Sp. Defense': 100,
    Speed: 80,
  },
  species: 'Seed Pokémon',
  description:
    'There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people.',
  evolution: { prev: ['2', 'Level 32'] },
  profile: {
    height: '2 m',
    weight: '100 kg',
    egg: ['Monster', 'Grass'],
    ability: [
      ['Overgrow', 'false'],
      ['Chlorophyll', 'true'],
    ],
    gender: '87.5:12.5',
  },
  image: {
    sprite:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/sprites/003.png',
    thumbnail:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/003.png',
    hires:
      'https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/003.png',
  },
  level: 1,
  xp: 0,
} as MyPokemonType

describe('SelectedPokemon', () => {
  test('not render selected pokemon', () => {
    render(<SelectedPokemon />)

    const selectedPokemon = screen.queryByTestId('selected-pokemon')

    expect(selectedPokemon).not.toBeInTheDocument()
  })

  test('render selected pokemon', () => {
    render(<SelectedPokemon pokemon={pokemonWithTwoTypes} />)

    const selectedPokemon = screen.queryByTestId('selected-pokemon')

    expect(selectedPokemon).toBeInTheDocument()
  })

  test('render selected pokemon', () => {
    render(<SelectedPokemon pokemon={pokemon} />)

    const selectedPokemon = screen.queryByTestId('selected-pokemon')

    expect(selectedPokemon).toBeInTheDocument()
  })

  test('render selected pokemon with two types', () => {
    render(<SelectedPokemon pokemon={pokemonWithTwoTypes} />)

    const selectedPokemon = screen.queryByTestId('selected-pokemon')

    expect(selectedPokemon).toBeInTheDocument()
  })
})
