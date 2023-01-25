import 'styled-components'

type Sizes = {
  text: string
  editorFontSize: string
  editorFontWeight: number
  borderRadius: string
  editorBorderWidth: string
}

type Colors = {
  background: string
  editorBorderColor: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: Sizes
    colors: Colors
  }
}
