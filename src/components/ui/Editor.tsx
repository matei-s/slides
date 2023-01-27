import { ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { Source_Code_Pro } from '@next/font/google'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import md from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown'

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

SyntaxHighlighter.registerLanguage('md', md)

export function Editor({
  editorContent,
  setEditorContent,
}: {
  editorContent: string
  setEditorContent: (v: string) => void
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key == 's') {
      event.preventDefault()
    }
  }

  return (
    <EditorWrapper
      className={sourceCodePro.className}
      onKeyDown={handleKeyDown}
    >
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

  border-radius: ${p => p.theme.sizes.borderRadiusM};
  border-color: ${p => p.theme.colors.editor.border};
  border-width: ${p => p.theme.sizes.editor.borderWidth};

  background-color: ${p => p.theme.colors.editor.backgorund};
  :focus {
    background-color: ${p => p.theme.colors.editor.focusedBackground};
  }
  transition: background-color 100ms;

  width: 100%;
  height: 100%;
  padding: 1em 2ch;
  resize: none;
  font-weight: 100;
  color: transparent;
  caret-color: black;
  font-family: inherit;

  ::placeholder {
    opacity: 0.5;
  }
`
