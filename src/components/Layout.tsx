import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  Pencil1Icon,
  UpdateIcon,
} from '@radix-ui/react-icons'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './Button'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { checkpointEditorContentAtom, checkpointMdxModuleAtom } from './MDXEditor'

const pageAtom = atom<HTMLElement | null>(null)

export function Layout({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({})
  const [recentlyMoved, setRecentlyMoved] = useState(false)
  const pageRef = useRef(null)
  const setPage = useSetAtom(pageAtom)

  useEffect(() => {
    setRecentlyMoved(true)

    const timer = setTimeout(() => {
      setRecentlyMoved(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [mousePosition])

  useEffect(() => {
    setPage(pageRef.current)
  }, [setPage])

  useEffect(() => {})

  return (
    <LayoutWrapper ref={pageRef} onMouseMove={e => setMousePosition({ x: e.pageX, y: e.pageY })}>
      <Dialog.Root>
        <Header showing={recentlyMoved} />
        {children}
      </Dialog.Root>
    </LayoutWrapper>
  )
}

function Header({ showing }: { showing: boolean }) {
  const page = useAtomValue(pageAtom)
  const isFullscreen = useRef(false)

  useEffect(() => {
    isFullscreen.current = document.fullscreenElement !== null
  })

  return (
    <HeaderWrapper showing={showing}>
      <Dialog.Trigger asChild>
        <Button>
          <Pencil1Icon />
        </Button>
      </Dialog.Trigger>
      <Button
        onClick={() => {
          console.log('fullscreen', isFullscreen)
          if (!document.fullscreenEnabled) {
            return
          }

          if (isFullscreen.current) {
            document.exitFullscreen().then(() => {})
          } else {
            page?.requestFullscreen().then(() => {})
          }
        }}
      >
        {isFullscreen.current ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
      </Button>
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
  padding-bottom: 32px;

  display: flex;
  gap: 8px;

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
