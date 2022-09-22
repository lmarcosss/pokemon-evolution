import { Button } from '../button'
import { FormEvent, useState } from 'react'
import { Modal } from '../modal'

import styles from '@styles/components/code-modal.module.css'

interface Props {
  isVisible: boolean
  onCloseModal(): void
  onSubmit(code: string): void
}

export function CodeModal({ onCloseModal, isVisible, onSubmit }: Props) {
  const [code, setCode] = useState('')

  function onSubmitForm(event: FormEvent) {
    event.preventDefault()
    onSubmit(code)

    setTimeout(() => {
      setCode('')
    }, 1000)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCode(event.target.value)
  }

  return (
    <Modal onClose={onCloseModal} isVisible={isVisible}>
      <div className={styles.containerModal}>
        <Button onClick={onCloseModal} className={styles.closeButton}>
          X
        </Button>

        <div>
          <p>Its awesome, you finded the secret!</p>
          <p>Now you can choose other Pokemon using his code...</p>
        </div>

        <form onSubmit={onSubmitForm}>
          <input
            autoFocus
            onChange={onChange}
            value={code}
            required
            maxLength={3}
            className={styles.codeInput}
            name="code"
          />
          <Button disabled={!code} type="submit" className={styles.codeButton}>
            Activate Code
          </Button>
        </form>
      </div>
    </Modal>
  )
}
