import { cyan, slate, blue, orange, yellow, tomato } from '@radix-ui/colors'
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
    xml: orange.orange10,
    xmlName: tomato.tomato9,
    xmlAttr: orange.orange10,
  },

  button: {
    content: slate.slate11,
  },

  error: {
    background: tomato.tomato8,
    text: tomato.tomato1,
  },
}

const effects = {
  shadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
}

export const lightTheme: DefaultTheme = {
  sizes,
  colors,
  effects,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: typeof sizes
    colors: typeof colors
    effects: typeof effects
  }
}
