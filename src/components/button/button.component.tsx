import styles from '@styles/components/button.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?(): void
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      data-testid="button"
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${styles.button}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
