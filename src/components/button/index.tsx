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
    
    console.log("teste workflow")

    return (
        <button
            data-testid="button"
            onClick={onClick}
            disabled={disabled}
            className={className}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}
