import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LocalStorageKeysEnum } from '@enums'
import { useLocalStorage } from '@hooks'
import { BasePage } from '../_base-page'

export default function Adventure() {
    const { getItem } = useLocalStorage()
    const router = useRouter()

    useEffect(() => {
        const pokemon = getItem(LocalStorageKeysEnum.CHOOSED_POKEMON)

        if (!pokemon) {
            router.replace('/')
        }
    }, [getItem, router])

    return (
        <BasePage>
            <div>Aventura</div>
        </BasePage>
    )
}
