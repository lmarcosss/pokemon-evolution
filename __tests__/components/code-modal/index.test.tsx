import { CodeModal } from '@components'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Code Modal', () => {
    it('render input code', () => {
        const pokemonCode = '123'
        const props = {
            onCloseModal: () => {},
            isVisible: true,
            setPokemons: () => {},
        }

        render(<CodeModal {...props} />)

        const codeInput = screen.getByRole<HTMLInputElement>('textbox')

        fireEvent.change(codeInput, { target: { value: pokemonCode } })

        expect(codeInput.value).toEqual(pokemonCode)
    })

    it('render finish button', () => {
        const props = {
            onCloseModal: () => {},
            isVisible: true,
            setPokemons: () => {},
        }

        render(<CodeModal {...props} />)

        const finishButton = screen.queryByText('Ativar Código')

        expect(finishButton).toBeInTheDocument()
    })
})
