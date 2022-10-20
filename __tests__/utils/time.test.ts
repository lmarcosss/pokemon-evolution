import { transformSecondsToMilliseconds } from '@utils'

describe('Time', () => {
  it('transform seconds to milliseconds', () => {
    const milisecondsExpected = 102000

    expect(transformSecondsToMilliseconds(100)).toBe(milisecondsExpected)
  })
})
