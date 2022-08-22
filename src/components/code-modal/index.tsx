import { Button } from '../button'
import { FormEvent } from 'react'
import { Modal } from '../modal'

import styles from '@styles/components/code-modal.module.css'

interface Props {
    isVisible: boolean
    onCloseModal(): void
    onSubmit(): void
    code: string
    setCode(code: string): void
}

export function CodeModal({
    onCloseModal,
    isVisible,
    onSubmit,
    code,
    setCode,
}: Props) {
    function onSubmitForm(event: FormEvent) {
        event.preventDefault()
        onSubmit()
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
                        onChange={onChange}
                        value={code}
                        required
                        maxLength={3}
                        className={styles.codeInput}
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
