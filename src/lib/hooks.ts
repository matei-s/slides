import {
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState(initialValue)

  const decoratedSetState = useCallback(
    (newState: T) => {
      localStorage.setItem(key, JSON.stringify(newState))
      setState(newState)
    },
    [key],
  )

  useLayoutEffect(() => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      setState(JSON.parse(item))
    }
  }, [key])

  return [state, decoratedSetState] as const
}
