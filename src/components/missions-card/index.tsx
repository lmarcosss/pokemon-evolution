import { MissionType } from '@types'
import { Mission } from '../mission'

import styles from '@styles/components/missions-card.module.css'

interface IProps {
  missions: MissionType[]
}

export function MissionsCard({ missions }: IProps) {
  return (
    <div className={styles.missionsCard}>
      <p className={styles.titleMissionsCard}>Missions:</p>

      {missions.map((mission, index) => (
        <Mission key={mission.title} mission={mission} index={index} />
      ))}
    </div>
  )
}
