import { MissionType } from '@types'
import { Mission } from '../mission/mission.component'

import styles from '@styles/components/missions-card.module.css'

interface IProps {
  missions: MissionType[]
  onClick(mission?: MissionType): void
  selectedMission?: MissionType
  seconds: number
}

export function MissionsCard({
  missions,
  onClick,
  selectedMission,
  seconds,
}: IProps) {
  return (
    <div data-testid="missions-card" className={styles.missionsCard}>
      <p className={styles.titleMissionsCard}>Missions:</p>

      {missions.map((mission, index) => (
        <Mission
          onClick={onClick}
          selectedMission={selectedMission}
          key={mission.title + mission.id}
          mission={mission}
          index={index}
          seconds={seconds}
        />
      ))}
    </div>
  )
}
