import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from 'src/pages'

describe('Home Page', () => {
    it('render home page', () => {
        render(<Home pokemonsAPI={[]} />)

        const playButton = screen.getByText('Bora Jogar')

        expect(playButton).toBeInTheDocument()
    })

    it('open code modal', () => {
        const openModal = jest.fn()
        const easterEggText = 'seu'

        render(<Home pokemonsAPI={[]} />)

        const spanButton = screen.getByText(easterEggText)
        spanButton.onclick = openModal

        fireEvent.click(spanButton)

        expect(openModal).toHaveBeenCalledTimes(1)
    })
})
