import Head from 'next/head'
import { Layout } from '~/components/Layout'
import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '~/components/Button'
import {
  checkpointEditorContentAtom,
  checkpointMdxModuleAtom,
  MDXEditor,
  editorContentAtom,
  mdxModuleAtom,
  nonTrimmableContentAtom,
  sourceCodePro,
  validMDXAtom,
} from '~/components/MDXEditor'
import { ReactNode, useEffect, useRef } from 'react'
import { evaluateSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import { ErrorBoundary } from 'react-error-boundary'
import { components } from '~/components/MDXComponents'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { getErrorMessage, logError } from '~/lib/error'
import TestRenderer from 'react-test-renderer'
import React from 'react'
import { RunnerOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options'
const runtimeOptions = runtime as unknown as RunnerOptions

export default function Home() {
  const nonTrimmableContent = useAtomValue(nonTrimmableContentAtom)

  return (
    <>
      <Head>
        <title>Training Slides</title>
        <meta
          name='description'
          content='Simple web-based Markdown slides editor.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='msapplication-TileColor' content='#FFF' />
        <meta name='theme-color' content='#FFF' />
        <link rel='icon' href='/favicon-32x32.png' />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-36x36.png'
          sizes='36x36'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-48x48.png'
          sizes='48x48'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-72x72.png'
          sizes='72x72'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-96x96.png'
          sizes='96x96'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-144x144.png'
          sizes='144x144'
        />
        <link
          rel='icon'
          type='image/png'
          href='/android-icon-192x192.png'
          sizes='192x192'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-96x96.png'
          sizes='96x96'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-16x16.png'
          sizes='16x16'
        />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta
          name='msapplication-square70x70logo'
          content='/ms-icon-70x70.png'
        />
        <meta
          name='msapplication-square150x150logo'
          content='/ms-icon-150x150.png'
        />
        <meta
          name='msapplication-wide310x150logo'
          content='/ms-icon-310x150.png'
        />
        <meta
          name='msapplication-square310x310logo'
          content='/ms-icon-310x310.png'
        />
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
        <link
          href='/apple-startup-750x1024.png'
          media=''
          rel='apple-touch-startup-image'
        />
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
      </Head>
      <Layout>
        <ErrorBoundary
          fallbackRender={({ error }) => {
            const message = getErrorMessage(error)
            return <pre>{message}</pre>
          }}
          resetKeys={[nonTrimmableContent]}
        >
          <MDXProvider components={components}>
            <SlideContent />
          </MDXProvider>
        </ErrorBoundary>
        <DialogOverlay />
        <DialogContent>
          <DialogClose asChild>
            <Button>
              <Cross1Icon />
            </Button>
          </DialogClose>
          <MDXEditor />
          <EditorError />
          <DialogDescription>Slide Editor</DialogDescription>
          <div>The editor content is automatically saved 👍</div>
        </DialogContent>
      </Layout>
    </>
  )
}

const ErrorContent = styled.pre`
  white-space: pre-wrap;
  overflow: auto;
  height: 100%;
  padding: 8px 16px;
  max-height: 160px;

  font-weight: 400;
  font-size: ${18 / 16}rem;
  z-index: 2;
  font-family: ${sourceCodePro.style.fontFamily};
  font-weight: 600;
  ::selection {
    background: black;
  }
`

const ErrorWrapper = styled.div`
  box-shadow: ${p => p.theme.effects.shadow};
  border-radius: ${p => p.theme.sizes.borderRadiusS};
  background: ${p => p.theme.colors.tomato8};
  color: ${p => p.theme.colors.error.text};
  overflow: hidden;
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: 12px;

  border-top: 1px solid hsl(0deg 90% 90% / 0.5);
  border-bottom: 1px solid hsl(0deg 90% 20% / 0.2);

  transition-property: opacity;

  &[data-visible='false'] {
    transition-duration: 50ms;
    opacity: 0;
  }

  &[data-visible='true'] {
    transition-duration: 100ms;
    opacity: 1;
  }
`

function EditorError() {
  const message = useAtomValue(editorErrorAtom)
  const prevMessage = useAtomValue(prevEditorErrorAtom)

  const visible = message.length > 0

  return (
    <ErrorWrapper data-visible={visible}>
      <ErrorContent>{visible ? message : prevMessage}</ErrorContent>
    </ErrorWrapper>
  )
}

const editorErrorHistoryAtom = atom(['', ''])
const editorErrorAtom = atom(
  get => get(editorErrorHistoryAtom)[0],
  (get, set, newError: string) => {
    const errors = get(editorErrorHistoryAtom)
    set(editorErrorHistoryAtom, [newError, ...errors])
  },
)
const prevEditorErrorAtom = atom(get => get(editorErrorHistoryAtom)[1])

const SlideContent = () => {
  const [mdxModule, setMdxModule] = useAtom(mdxModuleAtom)
  const [checkpointMdxModule, setCheckpointMdxModule] = useAtom(
    checkpointMdxModuleAtom,
  )
  const editorContent = useAtomValue(editorContentAtom)
  const [checkpointEditorContent, setCheckpointEditorContent] = useAtom(
    checkpointEditorContentAtom,
  )
  const setEditorError = useSetAtom(editorErrorAtom)
  const [validMDX, setValidMDX] = useAtom(validMDXAtom)

  // this one deals with rendering content
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = evaluateSync(editorContent, {
          ...runtimeOptions,
          useMDXComponents,
        })
        TestRenderer.create(React.createElement(result.default, { components }))

        setMdxModule(result)
        setValidMDX(true)
        setEditorError('')
      } catch (error) {
        logError({ error, label: 'render' })
        const message = getErrorMessage(error)
        setEditorError(message.trim())
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [editorContent, setMdxModule, setEditorError, setValidMDX])

  // this one deals with the checkpoint logic
  useEffect(() => {
    if (validMDX && mdxModule) {
      setCheckpointEditorContent(editorContent)
      setCheckpointMdxModule(mdxModule)
      return
    }

    if (!checkpointMdxModule && checkpointEditorContent) {
      try {
        const result = evaluateSync(checkpointEditorContent, {
          ...runtimeOptions,
          useMDXComponents,
        })
        TestRenderer.create(React.createElement(result.default, { components }))
        setCheckpointMdxModule(result)
        setValidMDX(true)
        setEditorError('')
      } catch (error) {
        logError({ error, label: 'checkpoint render' })
        const message = getErrorMessage(error)
        setEditorError(message.trim())
      }
    }
  }, [
    editorContent,
    validMDX,
    mdxModule,
    checkpointMdxModule,
    checkpointEditorContent,

    setCheckpointEditorContent,
    setCheckpointMdxModule,
    setEditorError,
    setValidMDX,
  ])

  const CheckpointMdxContent = checkpointMdxModule?.default ?? null

  return (
    <SlideWrapper>
      <FlexSpacer />
      {CheckpointMdxContent ? <CheckpointMdxContent /> : null}
      <FlexSpacer size={2} />
    </SlideWrapper>
  )
}

const SlideWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const FlexSpacer = styled.div<{ size?: number }>`
  flex: ${p => p.size ?? 1};
`

const DialogDescription = styled(Dialog.Description)`
  font-size: ${24 / 16}rem;
  font-weight: 500;
  position: absolute;
  height: 70px;

  top: 0px;
  left: 80px;
  align-items: center;
  display: flex;
`

const DialogClose = styled(Dialog.Close)`
  --space: 16px;
  position: absolute;
  top: var(--space);
  left: var(--space);
`

const overlayOpen = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const overlayClose = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: hsl(230deg 100% 5% / 0.2);

  &[data-state='open'] {
    animation: ${overlayOpen} 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${overlayClose} 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

const contentOpen = keyframes`
  from {
    transform: translateX(-100%) scale(1);
  }
  to {
    transform: translateX(0) scale(1);
  }
`

const contentClose = keyframes`
  from {
    transform: translateX(0) scale(1);
  }

  to {
    transform: translateX(-100%) scale(1);
  }
`

const DialogContent = styled(Dialog.Content)`
  padding: 16px;
  padding-top: 70px;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: ${p => p.theme.effects.shadow};
  background-color: ${p => p.theme.colors.background};

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30vw;

  min-width: 500px;
  max-width: 800px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  &[data-state='open'] {
    animation: ${contentOpen} 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${contentClose} 100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`
