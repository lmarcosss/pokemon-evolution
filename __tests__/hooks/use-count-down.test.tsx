import { act, renderHook } from '@testing-library/react'
import { useCountdown } from '@hooks'

const setCountDown = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (countDown: any) => [countDown, setCountDown],
}))

describe('useCountDown', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('send currentDate to hook', () => {
    const { result } = renderHook(() => useCountdown(new Date()))

    const [seconds] = result.current

    expect(seconds).toBe(0)
  })

  it('send futureDate to hook', () => {
    const date = new Date()
    const secondsExpected = 50
    date.setSeconds(secondsExpected)

    const { result } = renderHook(() => useCountdown(date))

    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(setCountDown).toHaveBeenCalled()
    expect(result.current).not.toBeUndefined()
  })

  it('send undefined to hook', () => {
    const { result } = renderHook(() => useCountdown(undefined))

    const [seconds] = result.current

    expect(seconds).toBe(0)
    expect(setCountDown).not.toHaveBeenCalled()
  })
})
