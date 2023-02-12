import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useInterval } from '~/lib/hooks'
import { sourceCodePro } from './MDXEditor'

type TimerProps = {
  until: string
}

function checkUntilFormat(until: string) {
  if (!until.match(/^\d\d:\d\d$/)) {
    throw new Error(
      [
        "Invalid 'until' property. It should be a string following the 'HH:MM' format. Example:",
        '',
        "<Timer until='14:50'/>",
      ].join('\n'),
    )
  }
}

function checkUntil(until: string) {
  if (until === undefined || typeof until !== 'string') {
    throw new Error(
      [
        "Invalid Timer properties. You need to specify 'until'. Example:",
        '',
        "<Timer until='14:50'/>",
      ].join('\n'),
    )
  }
}

const validateProps = ({ until }: TimerProps) => {
  checkUntil(until)
  checkUntilFormat(until)
}

const twoDigitPadded = (x: number) => {
  return x.toString().padStart(2, '0')
}

function parseUntil(until: string) {
  const [hoursStr, minutesStr] = until.split(':')
  const [hours, minutes] = [hoursStr, minutesStr].map(s => parseInt(s))
  return [hours, minutes] as const
}

const computeTimerValues = ({ until, now }: { until: string; now: number }) => {
  const [hours, minutes] = parseUntil(until)

  const currentTime = new Date(now)
  const stopTimeMinutesOffset = hours * 60 + minutes
  const currentTimeMinutesOffset =
    currentTime.getHours() * 60 + currentTime.getMinutes()

  const stopTime = new Date()
  stopTime.setHours(hours)
  stopTime.setMinutes(minutes)
  stopTime.setSeconds(0)

  const cycleOffset = 6 * 60 // 6 hours

  if (stopTimeMinutesOffset < currentTimeMinutesOffset - cycleOffset) {
    stopTime.setTime(stopTime.getTime() + 1000 * 60 * 60 * 24)
  }

  if (stopTime < currentTime) {
    return [0, 0, 0]
  }

  const timeDelta = stopTime.getTime() - currentTime.getTime()

  const timerSeconds = Math.floor(timeDelta / 1000) % 60
  const timerMinutes = Math.floor(timeDelta / (1000 * 60)) % 60
  const timerHours = Math.floor(timeDelta / (1000 * 60 * 60)) % 60

  return [timerHours, timerMinutes, timerSeconds]
}

const timerIntervalInnerAtom = atom<NodeJS.Timer | undefined>(undefined)
const timerIntervalAtom = atom(
  get => get(timerIntervalInnerAtom),
  (get, set, newInterval: NodeJS.Timer) => {
    const prevInterval = get(timerIntervalInnerAtom)
    clearInterval(prevInterval)
    set(timerIntervalInnerAtom, newInterval)
  },
)

export const globalTimeAtom = atom(Date.now())

export function Timer({ until }: TimerProps & { children: ReactNode }) {
  validateProps({ until })

  const globalTime = useAtomValue(globalTimeAtom)

  const [hours, minutes, seconds] = computeTimerValues({
    now: globalTime,
    until,
  })

  const hourSegment = hours ? `${twoDigitPadded(hours)}:` : ''
  const minuteSegment = `${twoDigitPadded(minutes)}:`
  const secondSegment = `${twoDigitPadded(seconds)}`

  return (
    <CounterWrapper>{`${hourSegment}${minuteSegment}${secondSegment}`}</CounterWrapper>
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
