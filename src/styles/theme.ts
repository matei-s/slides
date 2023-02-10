import { cyan, slate, blue, orange, yellow, tomato } from '@radix-ui/colors'
import { DefaultTheme } from 'styled-components'
import 'styled-components'

const sizes = {
  text: `${16 / 16}rem`,

  editor: {
    fontSize: `${20 / 16}rem`,
    fontWeight: 500,
    borderWidth: '1px',
  },

  borderRadiusL: '12px',
  borderRadiusM: '8px',
  borderRadiusS: '6px',
}

const colors = {
  background: cyan.cyan1,
  ...cyan,
  ...slate,

  editor: {
    border: slate.slate7,
    backgorund: slate.slate6,
    focusedBackground: slate.slate3,
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
