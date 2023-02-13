import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  CubeIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  Pencil2Icon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons'
import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './UI'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'

const pageAtom = atom<HTMLElement | null>(null)
const mouseMovedAtom = atom(true)
const mousePositionAtom = atom({ x: 0, y: 0 })

export function Layout({ children, className }: { children: ReactNode; className?: string }) {
  const [mousePosition, setMousePosition] = useAtom(mousePositionAtom)
  const setMouseMoved = useSetAtom(mouseMovedAtom)

  const pageRef = useRef(null)
  const setPage = useSetAtom(pageAtom)

  useEffect(() => {
    setMouseMoved(true)

    const timer = setTimeout(() => {
      setMouseMoved(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [mousePosition, setMouseMoved])

  useEffect(() => {
    setPage(pageRef.current)
  }, [setPage])

  return (
    <LayoutWrapper
      ref={pageRef}
      onMouseMove={e => setMousePosition({ x: e.pageX, y: e.pageY })}
      className={className}
    >
      <Dialog.Root>{children}</Dialog.Root>
    </LayoutWrapper>
  )
}

export function Header() {
  const mouseMoved = useAtomValue(mouseMovedAtom)
  const page = useAtomValue(pageAtom)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const fullscreenHandler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', fullscreenHandler)
    return () => document.removeEventListener('fullscreenchange', fullscreenHandler)
  }, [])

  return (
    <HeaderWrapper showing={mouseMoved}>
      <Dialog.Trigger asChild>
        <Button>
          <Pencil2Icon />
        </Button>
      </Dialog.Trigger>
      <Link href='/components'>
        <Button>
          <CubeIcon />
        </Button>
      </Link>
      <Link href='/about' style={{ marginInline: '-4px' }}>
        <Button>
          <QuestionMarkCircledIcon />
        </Button>
      </Link>
      <Button
        onClick={() => {
          if (!document.fullscreenEnabled) {
            return
          }
          if (isFullscreen) {
            document.exitFullscreen().then(() => {})
          } else {
            page?.requestFullscreen().then(() => {})
          }
        }}
      >
        {isFullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
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
  background: ${p => p.theme.colors.slate1};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  position: relative;
`

export function HeadMeta() {
  return (
    <>
      <meta name='description' content='Simple web-based Markdown slides editor.' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='msapplication-TileColor' content='#FFF' />
      <meta name='theme-color' content='#FFF' />
      <link rel='icon' href='/favicon-32x32.png' />
      <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
      <link rel='icon' type='image/png' href='/android-icon-36x36.png' sizes='36x36' />
      <link rel='icon' type='image/png' href='/android-icon-48x48.png' sizes='48x48' />
      <link rel='icon' type='image/png' href='/android-icon-72x72.png' sizes='72x72' />
      <link rel='icon' type='image/png' href='/android-icon-96x96.png' sizes='96x96' />
      <link rel='icon' type='image/png' href='/android-icon-144x144.png' sizes='144x144' />
      <link rel='icon' type='image/png' href='/android-icon-192x192.png' sizes='192x192' />
      <link rel='icon' type='image/png' href='/favicon-96x96.png' sizes='96x96' />
      <link rel='icon' type='image/png' href='/favicon-16x16.png' sizes='16x16' />
      <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
      <meta name='msapplication-square70x70logo' content='/ms-icon-70x70.png' />
      <meta name='msapplication-square150x150logo' content='/ms-icon-150x150.png' />
      <meta name='msapplication-wide310x150logo' content='/ms-icon-310x150.png' />
      <meta name='msapplication-square310x310logo' content='/ms-icon-310x310.png' />
      <link
        href='/apple-startup-320x460.png'
        media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-640x920.png'
        media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-640x1096.png'
        media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-748x1024.png'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)'
        rel='apple-touch-startup-image'
      />
      <link href='/apple-startup-750x1024.png' media='' rel='apple-touch-startup-image' />
      <link
        href='/apple-startup-750x1294.png'
        media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-768x1004.png'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-1182x2208.png'
        media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-1242x2148.png'
        media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-1496x2048.png'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        rel='apple-touch-startup-image'
      />
      <link
        href='/apple-startup-1536x2008.png'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        rel='apple-touch-startup-image'
      />
    </>
  )
}
