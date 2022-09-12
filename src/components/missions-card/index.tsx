import { Button } from '../button'
import { MissionType } from '@types'

import styles from '@styles/components/missions-card.module.css'

interface IProps {
    missions: MissionType[]
}

export function MissionsCard({ missions }: IProps) {
    return (
        <div className={styles.missionsCard}>
            <p className={styles.titleMissionsCard}>Missions:</p>

            {missions.map((mission, index) => (
                <div
                    key={mission.title}
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
            ))}
        </div>
    )
}
