import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '~/styles/theme'
import CSSGlobalStyles from '~/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
      <CSSGlobalStyles />
    </ThemeProvider>
  )
}
