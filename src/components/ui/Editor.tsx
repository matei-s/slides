import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Source_Code_Pro } from '@next/font/google'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

SyntaxHighlighter.registerLanguage('md', md)

export function Editor({
  editorContent,
  setEditorContent,
}: {
  editorContent: string
  setEditorContent: (v: string) => void
}) {
  return (
    <EditorWrapper className={sourceCodePro.className}>
      <Display language='md'>{editorContent}</Display>
      <TextArea
        value={editorContent}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setEditorContent(e.target.value)
        }
        placeholder={'# Title'}
      />
    </EditorWrapper>
  )
}

const Display = styled(SyntaxHighlighter).attrs({ useInlineStyles: false })`
  position: absolute;
  background: none !important;
  padding: 1em 2ch !important;
  border: 1px solid transparent;
  inset: 0;
  pointer-events: none;

  font-family: inherit;
  & code {
    font-family: inherit;
  }

  & .hljs-section {
    font-weight: 600;
    color: ${p => p.theme.colors.editor.section};
  }
`

const EditorWrapper = styled.div`
  font-size: ${p => p.theme.sizes.editorFontSize};

  position: relative;
  width: 100%;
  height: 100%;
`

const TextArea = styled.textarea`
  border-radius: ${p => p.theme.sizes.borderRadiusM};
  border-color: ${p => p.theme.colors.editor.border};
  border-width: ${p => p.theme.sizes.editorBorderWidth};
  width: 100%;
  height: 100%;
  padding: 1em 2ch;
  resize: none;
  color: transparent;
  caret-color: black;
  font-family: inherit;
  outline: none;

  ::placeholder {
    opacity: 0.5;
  }
`
