import { MissionsCard } from '@components'
import { render, screen } from '@testing-library/react'
import { MissionType } from '@types'
import '@testing-library/jest-dom'

const text = 'Missions:'
const onClick = jest.fn()
const selectedMission = {} as MissionType

describe('MissionsCard', () => {
  test('render missions card', () => {
    render(
      <MissionsCard
        onClick={onClick}
        missions={[selectedMission]}
        seconds={0}
      />
    )

    const missionCard = screen.queryByTestId('missions-card')
    const textElement = screen.getByText(text)

    expect(textElement.textContent).toBe(text)
    expect(missionCard).toBeInTheDocument()
  })
})
