import { CodeModal } from '@components'
import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import exp from 'constants'

describe('CodeModal', () => {
  const props = {
    onCloseModal: jest.fn(),
    isVisible: true,
    setPokemons: jest.fn(),
    onSubmit: jest.fn(),
  }

  const buttonText = 'Activate Code'

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render input code', () => {
    const pokemonCode = '123'

    render(<CodeModal {...props} />)

    const codeInput = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(codeInput, { target: { value: pokemonCode } })

    expect(codeInput.value).toBe(pokemonCode)
  })

  it('render finish button', () => {
    render(<CodeModal {...props} />)

    const finishButton = screen.queryByText(buttonText)

    expect(finishButton).toBeInTheDocument()
  })

  it('click finish button', () => {
    const pokemonCode = '123'
    const onFinish = jest.fn()

    render(<CodeModal {...props} />)

    const codeInput = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.change(codeInput, { target: { value: pokemonCode } })

    const finishButton = screen.getByText(/Activate Code/i)
    finishButton.onclick = onFinish
    fireEvent.click(finishButton)

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it('finish button disabled when input is empty', () => {
    render(<CodeModal {...props} />)

    const finishButton = screen.getByText(buttonText)

    expect(finishButton).toBeDisabled()
  })
})
