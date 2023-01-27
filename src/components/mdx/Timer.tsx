import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { sourceCodePro } from '../ui'

type TimerProps = {
  from: string
  duration: string
} & { until: string }

const validateProps = ({ from, duration, until }: TimerProps) => {
  if ((!from || !duration) && !until) {
    throw new Error(
      `Invalid Timer properties. Either specify 'from' AND 'duration', OR 'until'.`,
    )
  }
}

const computeTimerValue = ({ from, duration, until }: TimerProps) => {
  validateProps({ from, duration, until })
  if (from && duration) {
    return computeFromDuration(from, duration)
  }
  return computeUntil(until)
}

const computeFromDuration = (from, duration) => [1, 2, 3]

const twoDigitPad = (x: number) => {
  return x.toString().padStart(2, '0')
}

const computeUntil = (until: string) => {
  const stopTime = Date.parse(until)
  if (!stopTime) {
    throw new Error(
      `Please provide a valid 'until' value for the Timer component. For example: '12 Jan 2023 14:50'`,
    )
  }
  const now = Date.now()
  if (now >= stopTime) {
    return [0, 0, 0]
  }

  const seconds = Math.floor((stopTime - now) / 1000) % 60
  const minutes = Math.floor((stopTime - now) / (1000 * 60)) % 60
  const hours = Math.floor((stopTime - now) / (1000 * 60 * 60)) % 60

  return [hours, minutes, seconds]
}

export function Timer({ from, duration, until }: TimerProps) {
  const [timerValue, setTimerValue] = useState<number[]>([])

  useEffect(() => {
    setTimerValue(computeTimerValue({ from, duration, until }))
    const interval = setInterval(() => {
      setTimerValue(computeTimerValue({ from, duration, until }))
    }, 1000)

    return () => clearInterval(interval)
  }, [from, duration, until])

  const [hours, minutes, seconds] = timerValue.map(twoDigitPad)

  return (
    <CounterWrapper>
      {timerValue.length ? `${hours}:${minutes}:${seconds}` : null}
    </CounterWrapper>
  )
}

const CounterWrapper = styled.div`
  position: fixed;
  font-size: ${40 / 16}rem;
  right: 64px;
  top: 32px;
  font-family: ${sourceCodePro.style.fontFamily};
`
