import { Modal } from '@components'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Modal', () => {
  const props = {
    onClose: jest.fn(),
    isVisible: true,
  }

  it('render modal', () => {
    const text = 'Pokemon'

    const { container } = render(
      <Modal {...props}>
        <p>{text}</p>
      </Modal>
    )

    const modalContent = screen.getByText(text)
    const modalContentStyle = container.getElementsByClassName('show')

    expect(modalContentStyle.length).toBe(1)
    expect(modalContent).toBeInTheDocument()
  })

  it('render modal when isVisible is false', () => {
    const text = 'Pokemon'
    const isVisible = false

    const { container } = render(
      <Modal {...props} isVisible={isVisible}>
        <p>{text}</p>
      </Modal>
    )

    const modalContent = container.getElementsByClassName('show')

    expect(modalContent.length).toBe(0)
  })
})
