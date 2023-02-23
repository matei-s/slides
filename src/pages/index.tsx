import Head from 'next/head'
import { Header, HeadMeta, Layout } from '~/components/Layout'
import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Component1Icon, Cross1Icon, CubeIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/UI'
import { MDXEditor, nonTrimmableContentAtom, EditorError, MDXContent } from '~/components/MDXEditor'
import { MDXProvider } from '@mdx-js/react'
import { ErrorBoundary } from 'react-error-boundary'
import { components, globalTimeAtom } from '~/components/MDXComponents'
import { useAtomValue, useSetAtom } from 'jotai'
import { getErrorMessage } from '~/lib/error'
import React from 'react'
import { useInterval } from '~/lib/hooks'
import Link from 'next/link'

export default function Home() {
  const nonTrimmableContent = useAtomValue(nonTrimmableContentAtom)
  const setGlobalTime = useSetAtom(globalTimeAtom)

  useInterval(() => {
    setGlobalTime(() => Date.now())
  }, 1000)

  return (
    <>
      <Head>
        <title>Slides</title>
        <HeadMeta />
      </Head>
      <Layout>
        <Header />
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
          <ComponentsLink href='/components'>
            <Button>
              <CubeIcon />
            </Button>
          </ComponentsLink>
          <DialogDescription>Slide Editor</DialogDescription>
          <div>The content is automatically saved 👍</div>
        </DialogContent>
      </Layout>
    </>
  )
}

const ComponentsLink = styled(Link)`
  position: absolute;
  right: 16px;
  top: 16px;
`

const SlideContent = () => {
  return (
    <SlideWrapper>
      <FlexSpacer />
      <MDXContent />
      <FlexSpacer size={1.5} />
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
