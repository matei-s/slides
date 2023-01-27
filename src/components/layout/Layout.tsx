import { ReactNode, useEffect, useRef, useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../ui'

export function Layout({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({})
  const [recentlyMoved, setRecentlyMoved] = useState(false)

  useEffect(() => {
    setRecentlyMoved(true)

    const timer = setTimeout(() => {
      setRecentlyMoved(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [mousePosition])

  return (
    <LayoutWrapper
      onMouseMove={e => setMousePosition({ x: e.pageX, y: e.pageY })}
    >
      <Dialog.Root>
        <Header showing={recentlyMoved} />
        {children}
      </Dialog.Root>
    </LayoutWrapper>
  )
}

function Header({ showing }: { showing: boolean }) {
  return (
    <HeaderWrapper showing={showing}>
      <Dialog.Trigger asChild>
        <Button>
          <Pencil1Icon />
        </Button>
      </Dialog.Trigger>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header<{ showing: boolean }>`
  opacity: ${p => (p.showing ? 1 : 0)};
  transition: opacity 300ms;
  width: 100%;
  position: absolute;
  top: 0;
  padding: 16px;
  height: 100px;

  :has(:focus) {
    opacity: 1;
  }

  :hover {
    opacity: 1;
  }
`

const LayoutWrapper = styled.main`
  height: 100%;
  width: 100%;
  background: ${p => p.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`
