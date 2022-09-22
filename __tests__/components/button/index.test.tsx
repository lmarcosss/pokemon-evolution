import { Button } from '@components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Button', () => {
  test('render button', () => {
    const text = 'Bora Jogar'

    render(<Button>{text}</Button>)

    const button = screen.getByTestId<HTMLButtonElement>('button')

    expect(button.textContent).toBe(text)
    expect(button).toBeInTheDocument()
  })
})
