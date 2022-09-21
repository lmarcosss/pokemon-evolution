import { MissionType } from '@types'
import { Button } from '../button'

import styles from '@styles/components/mission.module.css'

interface IProps {
    mission: MissionType
    index: number
}

export function Mission({ mission, index }: IProps) {
    return (
        <div
            className={`
                ${styles.mission}
                ${index % 2 !== 0 && styles.evenMission}
            `}
        >
            <div>
                <p>{mission.title}</p>
                <p>Time: {mission.time}</p>
                <p>XP: {mission.xp}</p>
            </div>

            <Button>Play</Button>
        </div>
    )
}
