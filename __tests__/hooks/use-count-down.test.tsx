import { act, renderHook } from '@testing-library/react'
import { useCountdown } from '@hooks'

import React from 'react'

describe('useCountDown', () => {
  const setCountDown = jest.fn()

  beforeEach(() => {
    const useStateSpy = jest.spyOn(React, 'useState')

    const useStateMock: any = (countDown: unknown) => [countDown, setCountDown]

    useStateSpy.mockImplementation(useStateMock)

    jest.useFakeTimers()
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
})
