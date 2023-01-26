import { cyan, slate, blue } from '@radix-ui/colors'
import { DefaultTheme } from 'styled-components'
import 'styled-components'

const sizes = {
  text: `${16 / 16}rem`,
  editorFontSize: `${20 / 16}rem`,
  editorFontWeight: 500,

  borderRadiusL: '12px',
  borderRadiusM: '8px',
  borderRadiusS: '6px',

  editorBorderWidth: '1px',
}

const colors = {
  background: cyan.cyan1,

  editor: {
    border: slate.slate10,
    section: blue.blue10,
  },

  button: {
    content: slate.slate11,
  },
}

export const lightTheme: DefaultTheme = {
  sizes,
  colors,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: typeof sizes
    colors: typeof colors
  }
}
