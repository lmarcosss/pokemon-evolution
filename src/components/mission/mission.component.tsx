import { MissionType } from '@types'
import { Button } from '../button/button.component'

import styles from '@styles/components/mission.module.css'

interface IProps {
    mission: MissionType
    index: number
    onClick(mission?: MissionType): void
    selectedMission?: MissionType
    seconds: number
}

export function Mission({
    mission,
    index,
    onClick,
    selectedMission,
    seconds,
}: IProps) {
    const isSelectedMission =
        selectedMission?.title === mission.title && seconds

    const textButton = isSelectedMission && seconds > 0 ? seconds : 'Play'

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

            <Button
                disabled={!!selectedMission}
                onClick={() => onClick(mission)}
            >
                {textButton}
            </Button>
        </div>
    )
}
