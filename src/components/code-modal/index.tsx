import { Button } from '../button'
import { FormEvent, useState } from 'react'
import { Modal } from '../modal'
import api from 'src/services'
import { ErrorType, PokemonType, SelectedPokemonType } from '@types'
import { toast } from 'react-toastify'
import { ErrorMessagesEnum, StatusCodeEnum } from '@enums'

import styles from '@styles/components/code-modal.module.css'

interface Props {
    isVisible: boolean
    onCloseModal(): void
    setPokemons(pokemons: SelectedPokemonType[]): void
}

export function CodeModal({ onCloseModal, isVisible, setPokemons }: Props) {
    const [code, setCode] = useState('')

    async function onSubmitCode() {
        try {
            const { data: newPokemon } = await api.get<PokemonType>(
                '/pokemon',
                {
                    params: { id: code },
                }
            )

            setPokemons([{ ...newPokemon, isPokemonByCode: true }])
        } catch (error) {
            const errorApi = error as ErrorType

            const errorMessage =
                errorApi.response.status === StatusCodeEnum.NOT_FOUND
                    ? ErrorMessagesEnum.POKEMON_NOT_FOUND
                    : errorApi?.message

            toast.error(errorMessage || ErrorMessagesEnum.UNEXPECTED_ERROR, {
                theme: 'colored',
            })
        } finally {
            onCloseModal()
            setCode('')
        }
    }

    function onSubmitForm(event: FormEvent) {
        event.preventDefault()
        onSubmitCode()
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
