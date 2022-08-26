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
                    <p>Que demais, você descobriu o segredo!</p>
                    <p>
                        Agora você pode escolher outro pokemon utilizando o
                        código dele...
                    </p>
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
                    <Button
                        disabled={!code}
                        type="submit"
                        className={styles.codeButton}
                    >
                        Ativar Código
                    </Button>
                </form>
            </div>
        </Modal>
    )
}
