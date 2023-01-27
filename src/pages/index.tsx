import Head from 'next/head'
import { Layout } from '~/components/layout'
import styled, { keyframes } from 'styled-components'
import { useLocalStorage } from '~/lib/hooks'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, sourceCodePro } from '~/components/ui'
import { Editor } from '~/components/ui'
import { useEffect, useRef, useState } from 'react'
import { evaluate, EvaluateOptions } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import * as provider from '@mdx-js/react'
import { MDXProvider } from '@mdx-js/react'
import { MDXModule } from 'mdx/types'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import { Timer } from '~/components/mdx'
import { H1, H2 } from '~/components/typography'

const components = {
  Timer,
  h1: H1,
  h2: H2,
}

export default function Home() {
  const [editorContent, setEditorContent] = useLocalStorage(
    'editor-content',
    '',
  )

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
            return <Error>{error.message}</Error>
          }}
          resetKeys={[editorContent]}
        >
          <MDXProvider components={components}>
            <SlideContent editorContent={editorContent} />
          </MDXProvider>
        </ErrorBoundary>
        <DialogOverlay />
        <DialogContent>
          <DialogDescription>
            Edit the content of the slide here (it&apos;s automatically saved).
          </DialogDescription>
          <DialogClose asChild>
            <Button>
              <Cross1Icon />
            </Button>
          </DialogClose>
          <Editor {...{ editorContent, setEditorContent }} />
        </DialogContent>
      </Layout>
    </>
  )
}

const Error = styled.div`
  position: fixed;
  width: clamp(200px, 90vw, 600px);
  bottom: 50px;
  padding: 16px 24px;
  border-radius: ${p => p.theme.sizes.borderRadiusS};
  background: ${p => p.theme.colors.error.background};
  color: ${p => p.theme.colors.error.text};
  font-weight: 400;
  font-size: ${18 / 16}rem;
  box-shadow: ${p => p.theme.effects.shadow};
  z-index: 2;
  font-family: ${sourceCodePro.style.fontFamily};
  font-weight: 600;
  ::selection {
    background: black;
  }
  border-top: 1px solid hsl(0deg 90% 90% / 0.5);
  border-bottom: 1px solid hsl(0deg 90% 20% / 0.2);
`

const SlideWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const SlideContent = ({ editorContent }: { editorContent: string }) => {
  const [mdxValue, setMdxValue] = useState<MDXModule>({
    default: () => <div />,
  } as MDXModule)
  const renderCount = useRef(0)

  const MDXContent = mdxValue.default
  const handleError = useErrorHandler()

  useEffect(() => {
    const timer = setTimeout(
      () => {
        renderCount.current += 1
        evaluate(editorContent, {
          ...(runtime as EvaluateOptions),
          ...provider,
        }).then(result => setMdxValue(result), handleError)
      },
      renderCount.current < 2 ? 0 : 1500,
    )
    return () => clearTimeout(timer)
  }, [editorContent, handleError])

  return (
    <SlideWrapper>
      <MDXContent />
    </SlideWrapper>
  )
}

const DialogDescription = styled(Dialog.Description)`
  font-size: ${18 / 16}rem;
`

const DialogClose = styled(Dialog.Close)`
  --space: 16px;
  position: absolute;
  right: var(--space);
  top: var(--space);
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
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: hsl(230deg 100% 5% / 0.2);

  &[data-state='open'] {
    animation: ${overlayOpen} 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${overlayClose} 100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

const contentOpen = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(1);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const contentClose = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(1);
  }
`

const DialogContent = styled(Dialog.Content)`
  padding: 36px;
  background-color: white;
  border-radius: ${p => p.theme.sizes.borderRadiusL};
  box-shadow: ${p => p.theme.effects.shadow};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 900px;
  height: clamp(400px, calc(100% - 200px), 100%);

  display: flex;
  flex-direction: column;
  gap: 24px;

  &[data-state='open'] {
    animation: ${contentOpen} 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${contentClose} 100ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`
