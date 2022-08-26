import { CodeModal } from '@components'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Code Modal', () => {
    const props = {
        onCloseModal: jest.fn(),
        isVisible: true,
        setPokemons: jest.fn(),
        onSubmit: jest.fn(),
    }

    it('render input code', () => {
        const pokemonCode = '123'

        render(<CodeModal {...props} />)

        const codeInput = screen.getByRole<HTMLInputElement>('textbox')

        fireEvent.change(codeInput, { target: { value: pokemonCode } })

        expect(codeInput.value).toBe(pokemonCode)
    })

    it('render finish button', () => {
        render(<CodeModal {...props} />)

        const finishButton = screen.queryByText('Ativar Código')

        expect(finishButton).toBeInTheDocument()
    })

    it('click finish button', () => {
        const pokemonCode = '123'
        const onFinish = jest.fn()

        render(<CodeModal {...props} />)

        const codeInput = screen.getByRole<HTMLInputElement>('textbox')
        fireEvent.change(codeInput, { target: { value: pokemonCode } })

        const finishButton = screen.getByText(/Ativar Código/i)
        finishButton.onclick = onFinish
        fireEvent.click(finishButton)

        expect(onFinish).toHaveBeenCalledTimes(1)
    })

    it('finish button disabled when input is empty', () => {
        render(<CodeModal {...props} />)

        const finishButton = screen.getByText(/Ativar Código/i)

        expect(finishButton).toBeDisabled()
    })
})
