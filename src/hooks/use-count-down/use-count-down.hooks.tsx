import { useEffect, useState } from 'react'

const useCountdown = (targetDate: Date) => {
    const countDownDate = new Date(targetDate).getTime()

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [countDownDate])

    return getReturnValues(countDown)
}

const getReturnValues = (countDown: number) => {
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

    return [seconds]
}

export { useCountdown }
