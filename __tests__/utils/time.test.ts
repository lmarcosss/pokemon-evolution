import { transformSecondsToMilliseconds } from '@utils'

describe('Time', () => {
  it('transform seconds to milliseconds', () => {
    const milisecondsExpected = 100000

    expect(transformSecondsToMilliseconds(100)).toBe(milisecondsExpected)
  })
})
