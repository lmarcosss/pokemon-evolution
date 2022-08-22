import styles from '@styles/components/modal.module.css'

interface Props {
    children: React.ReactNode
    isVisible: boolean
    onClose(): void
}

export function Modal({ isVisible, onClose, children }: Props) {
    if (!isVisible) return null

    return (
        <div
            onClick={onClose}
            className={`${styles.modal} ${isVisible ? styles.show : ''}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.content}
            >
                {children}
            </div>
        </div>
    )
}
