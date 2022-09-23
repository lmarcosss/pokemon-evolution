import { BasePage } from '@components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('BasePage', () => {
  it('render base page', () => {
    const title = 'Catch your pokemon'

    render(
      <BasePage>
        <p>{title}</p>
      </BasePage>
    )

    const basePage = screen.getByText(title)

    expect(basePage).toBeInTheDocument()
  })
})
