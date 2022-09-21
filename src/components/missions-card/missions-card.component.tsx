import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { MissionType } from '@types'
import { useCountdown } from '@hooks'
import { CookiesKeysEnum } from '@enums'
import { Mission } from '../mission/mission.component'

import styles from '@styles/components/missions-card.module.css'

interface IProps {
    missions: MissionType[]
}

interface SelectedMissionType extends MissionType {
    missionEndsAt?: Date
}

export function MissionsCard({ missions }: IProps) {
    const [selectedMission, setSelectedMission] =
        useState<SelectedMissionType>()
    const [cookies, setCookies, removeCookie] = useCookies([
        CookiesKeysEnum.SELECTED_MISSION,
    ])

    const selectedDate = useMemo(() => {
        if (selectedMission?.missionEndsAt) {
            return new Date(selectedMission.missionEndsAt)
        }

        return new Date()
    }, [selectedMission])

    const [seconds] = useCountdown(selectedDate)

    function getMissionEndsAt(time: number) {
        const currentDate = new Date()

        const secondsInMiliSeconds = (time + 2) * 1000

        currentDate.setTime(currentDate.getTime() + secondsInMiliSeconds)

        return currentDate
    }

    function onClick(selectedMission?: MissionType) {
        setCookies(
            CookiesKeysEnum.SELECTED_MISSION,
            !!selectedMission?.time
                ? {
                      ...selectedMission,
                      missionEndsAt: getMissionEndsAt(selectedMission.time),
                  }
                : ''
        )
    }

    useEffect(() => {
        if (cookies.selectedMission) {
            setSelectedMission(cookies.selectedMission)
        }
    }, [cookies.selectedMission, selectedMission])

    useEffect(() => {
        if (cookies.selectedMission && selectedMission && seconds <= 0) {
            setSelectedMission(undefined)
            removeCookie(CookiesKeysEnum.SELECTED_MISSION)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.selectedMission, seconds, removeCookie])

    return (
        <div className={styles.missionsCard}>
            <p className={styles.titleMissionsCard}>Missions:</p>

            {missions.map((mission, index) => (
                <Mission
                    onClick={onClick}
                    selectedMission={selectedMission}
                    key={mission.title}
                    mission={mission}
                    index={index}
                    seconds={seconds}
                />
            ))}
        </div>
    )
}
