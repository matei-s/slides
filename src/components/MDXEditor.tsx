import { ChangeEvent, KeyboardEvent, useEffect } from 'react'
import styled from 'styled-components'
import { Source_Code_Pro } from '@next/font/google'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { MDXModule } from 'mdx/types'
import { evaluateSync } from '@mdx-js/mdx'
import TestRenderer from 'react-test-renderer'
import * as runtime from 'react/jsx-runtime'
import { RunnerOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options'
import { useMDXComponents } from '@mdx-js/react'
import React from 'react'
import { components } from './MDXComponents'
import { getErrorMessage, logError } from '~/lib/error'
const runtimeOptions = runtime as unknown as RunnerOptions

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

SyntaxHighlighter.registerLanguage('md', md)

export const editorContentAtom = atomWithStorage('editor-content', '')
export const nonTrimmableContentAtom = atom(get => '*' + get(editorContentAtom) + '*')

export const mdxModuleAtom = atom<MDXModule | null>(null)
export const checkpointMdxModuleAtom = atom<MDXModule | null>(null)
export const checkpointEditorContentAtom = atomWithStorage('editor-checkpoint', '')
export const editorErrorHistoryAtom = atom(['', ''])
export const editorErrorAtom = atom(
  get => get(editorErrorHistoryAtom)[0],
  (get, set, newError: string) => {
    const errors = get(editorErrorHistoryAtom)
    set(editorErrorHistoryAtom, [newError, ...errors])
  },
)
export const prevEditorErrorAtom = atom(get => get(editorErrorHistoryAtom)[1])
export const validMDXAtom = atom(false)

export function MDXEditor() {
  const [editorContent, setEditorContent] = useAtom(editorContentAtom)
  const setValidMDX = useSetAtom(validMDXAtom)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key == 's') {
      event.preventDefault()
    }
  }

  return (
    <EditorWrapper className={sourceCodePro.className} onKeyDown={handleKeyDown}>
      <Display language='md'>{editorContent}</Display>
      <TextArea
        value={editorContent}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setValidMDX(false)
          setEditorContent(e.target.value)
        }}
        placeholder={'# Title'}
      />
    </EditorWrapper>
  )
}

export function MDXContent() {
  const editorContent = useAtomValue(editorContentAtom)
  const [mdxModule, setMdxModule] = useAtom(mdxModuleAtom)
  const [checkpointMdxModule, setCheckpointMdxModule] = useAtom(checkpointMdxModuleAtom)
  const [checkpointEditorContent, setCheckpointEditorContent] = useAtom(checkpointEditorContentAtom)
  const setEditorError = useSetAtom(editorErrorAtom)
  const [validMDX, setValidMDX] = useAtom(validMDXAtom)

  // this one deals with rendering content
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = evaluateSync(editorContent, {
          ...runtimeOptions,
          development: false,
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
          development: false,
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
    <ContentWrapper data-visible={checkpointEditorContent.length === 0 ? false : true}>
      {CheckpointMdxContent ? <CheckpointMdxContent /> : null}
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 300ms 300ms;
  padding: 32px;
  max-width: 800px;

  &[data-visible='true'] {
    opacity: 1;
  }
  &[data-visible='false'] {
    opacity: 0;
  }
`

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

export function EditorError() {
  const message = useAtomValue(editorErrorAtom)
  const prevMessage = useAtomValue(prevEditorErrorAtom)

  const visible = message.length > 0

  return (
    <ErrorWrapper data-visible={visible}>
      <ErrorContent>{visible ? message : prevMessage}</ErrorContent>
    </ErrorWrapper>
  )
}

const Display = styled(SyntaxHighlighter).attrs({ useInlineStyles: false })`
  position: absolute;
  background: none !important;
  padding: 1em 2ch !important;
  border: ${p => p.theme.sizes.editor.borderWidth} solid transparent;
  inset: 0;
  pointer-events: none;

  font-family: inherit;
  & code {
    font-family: inherit;
  }

  & * {
    white-space: break-spaces !important;
  }

  & .hljs-section {
    font-weight: 600;
    color: ${p => p.theme.colors.editor.section};
  }

  & .xml.hljs-name {
    font-weight: 800;
    color: ${p => p.theme.colors.editor.xmlName};
  }

  & .xml.hljs-attr {
    font-weight: 600;
    color: ${p => p.theme.colors.editor.xmlAttr};
  }
`

const EditorWrapper = styled.div`
  font-size: ${p => p.theme.sizes.editor.fontSize};

  position: relative;
  width: 100%;
  height: 100%;
`

const TextArea = styled.textarea.attrs({})`
  outline: none;

  border-radius: 4px;
  border-color: ${p => p.theme.colors.slate8};
  border-width: ${p => p.theme.sizes.editor.borderWidth};

  background-color: ${p => p.theme.colors.slate3};
  :focus {
    background-color: ${p => p.theme.colors.slate1};
  }
  transition: background-color 100ms;

  width: 100%;
  height: 100%;
  padding: 1em 2ch;
  resize: none;
  font-weight: 300;
  color: transparent;
  caret-color: black;
  font-family: inherit;

  ::placeholder {
    font-weight: 400;
    opacity: 0.5;
  }
`
