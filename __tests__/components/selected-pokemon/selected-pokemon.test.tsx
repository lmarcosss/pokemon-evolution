import { SelectedPokemon } from '@components'
import { render, screen } from '@testing-library/react'
import { MyPokemonType } from '@types'
import '@testing-library/jest-dom'

const pokemon = {
  id: '155',
  number: '155',
  name: 'Cyndaquil',
  species: 'Fire Mouse',
  types: ['Fire'],
  abilities: { normal: ['Blaze'], hidden: ['Flash Fire'] },
  eggGroups: ['Field'],
  gender: [87.5, 12.5],
  height: '1\'08"',
  weight: '17.4 lbs.',
  family: {
    id: 80,
    evolutionStage: 1,
    evolutionLine: ['Cyndaquil', 'Quilava', 'Typhlosion'],
  },
  starter: true,
  sprite: 'https://epackoug.sirv.com/pokemon/155.png',
  description:
    'The fire that spouts from its back burns hottest when it is angry. The flaring flames intimidate foes.',
  level: 1,
  xp: 0,
} as MyPokemonType

const pokemonWithTwoTypes = {
  id: '3',
  number: '3',
  name: 'Venusaur',
  species: 'Seed',
  types: ['Grass', 'Poison'],
  abilities: { normal: ['Overgrow'], hidden: ['Chlorophyll'] },
  gender: [87.5, 12.5],
  height: '6\'07"',
  weight: '220.5 lbs.',
  family: {
    id: 1,
    evolutionStage: 3,
    evolutionLine: ['Bulbasaur', 'Ivysaur', 'Venusaur'],
  },
  starter: false,
  sprite: 'https://epackoug.sirv.com/pokemon/003.png',
  description:
    'As it warms itself and absorbs the sunlight, its flower petals release a pleasant fragrance.',
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
    render(
      <SelectedPokemon
        pokemon={
          {
            sprite: 'https://epackoug.sirv.com/pokemon/003.png',
          } as MyPokemonType
        }
      />
    )

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
