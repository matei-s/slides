import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { sourceCodePro } from './MDXEditor'

type TimerProps = {
  from: string
  duration: string
} & { until: string }

const validateProps = ({ from, duration, until }: TimerProps) => {
  if (!until) {
    throw new Error(
      `Invalid Timer properties. You need to specify 'until'. Example: <Timer until='14:50'/>
      `,
    )
  }
}

const computeTimerValues = ({ from, duration, until }: TimerProps) => {
  validateProps({ from, duration, until })
  if (from && duration) {
    return computeFromDuration(from, duration)
  }
  return computeUntil(until)
}

const computeFromDuration = (from: string, duration: string) => [1, 2, 3]

const twoDigitPadded = (x: number) => {
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
  const [timerValues, setTimerValues] = useState<number[]>(() =>
    computeTimerValues({ from, duration, until }),
  )

  useEffect(() => {
    setTimerValues(computeTimerValues({ from, duration, until }))
    const interval = setInterval(() => {
      setTimerValues(computeTimerValues({ from, duration, until }))
    }, 500)

    return () => clearInterval(interval)
  }, [from, duration, until])

  const [hours, minutes, seconds] = timerValues.map(twoDigitPadded)

  return (
    <CounterWrapper>
      {timerValues.length ? `${hours}:${minutes}:${seconds}` : null}
    </CounterWrapper>
  )
}

const CounterWrapper = styled.div`
  position: fixed;
  font-size: ${40 / 16}rem;
  right: 32px;
  top: 16px;
  font-family: ${sourceCodePro.style.fontFamily};
`

const H1 = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 3rem;
`

const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
`

export const components = {
  Timer,
  h1: H1,
  h2: H2,
}
