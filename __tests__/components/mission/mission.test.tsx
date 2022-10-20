import { Mission } from '@components'
import { render, screen, fireEvent } from '@testing-library/react'
import { MissionType } from '@types'
import '@testing-library/jest-dom'

const onClick = jest.fn()
const mission = {
  title: 'Mission Test',
  time: 10,
  xp: 10,
} as MissionType
const selectedMission = mission

describe('Mission', () => {
  test('render mission', () => {
    render(
      <Mission
        mission={mission}
        selectedMission={selectedMission}
        onClick={onClick}
        seconds={0}
        index={0}
      />
    )

    const missionCard = screen.queryByTestId('mission')

    expect(missionCard).toBeInTheDocument()
  })

  test('render mission of index 1', () => {
    render(
      <Mission
        mission={mission}
        selectedMission={selectedMission}
        onClick={onClick}
        seconds={0}
        index={1}
      />
    )

    const missionCard = screen.queryByTestId('mission')

    expect(missionCard).toBeInTheDocument()
  })

  test('render mission when have seconds more then zero', () => {
    render(
      <Mission
        mission={mission}
        selectedMission={selectedMission}
        onClick={onClick}
        seconds={20}
        index={1}
      />
    )

    const missionCard = screen.queryByTestId('mission')

    expect(missionCard).toBeInTheDocument()
  })

  test('render mission and click on play button', () => {
    render(
      <Mission mission={mission} onClick={onClick} seconds={0} index={0} />
    )

    const missionCard = screen.queryByTestId('mission')
    const playButton = screen.getByText(/Play/)

    fireEvent.click(playButton)

    expect(missionCard).toBeInTheDocument()
  })
})
