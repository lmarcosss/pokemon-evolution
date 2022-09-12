import Image from 'next/image'
import { sadPikachu } from '@images'

import style from '@styles/pages/500.module.css'

export default function Custom500() {
    return (
        <div className={style.container}>
            <h1>Deu ruim</h1>
            <Image
                width={500}
                height={300}
                alt="pikachu crying"
                src={sadPikachu}
            />
        </div>
    )
}
