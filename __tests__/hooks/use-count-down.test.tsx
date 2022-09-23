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
    const secondsExpected = 0

    const { result } = renderHook(() => useCountdown(new Date()))

    const [seconds] = result.current

    expect(seconds).toBe(secondsExpected)
  })

  it('send futureDate to hook', () => {
    const date = new Date()
    const secondsExpected = 50

    date.setSeconds(date.getSeconds() + secondsExpected)

    const { result } = renderHook(() => useCountdown(date))

    act(() => {
      jest.runOnlyPendingTimers()
    })

    const [seconds] = result.current

    expect(setCountDown).toHaveBeenCalled()
    expect(seconds).toBe(secondsExpected)
  })

  it("don't send a value to hook", () => {
    const secondsExpected = 0

    const { result } = renderHook(() => useCountdown())

    const [seconds] = result.current

    expect(seconds).toBe(secondsExpected)
    expect(setCountDown).not.toHaveBeenCalled()
  })
})
