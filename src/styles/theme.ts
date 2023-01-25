import { cyan, cyanDark, slate, slateDark } from '@radix-ui/colors'
import { DefaultTheme } from 'styled-components'

const sizes = {
  text: `${16 / 16}rem`,
  editorFontSize: `${20 / 16}rem`,
  editorFontWeight: 500,
  borderRadius: '10px',
  editorBorderWidth: '1px',
}

export const lightTheme: DefaultTheme = {
  sizes,
  colors: {
    ...cyan,
    ...slate,

    background: cyan.cyan2,
    editorBorderColor: slate.slate10,
  },
}

export const darkTheme: DefaultTheme = {
  sizes,
  colors: {
    ...cyanDark,
    ...slateDark,

    background: cyanDark.cyan2,
    editorBorderColor: slateDark.slate9,
  },
}
