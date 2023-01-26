import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '~/styles/theme'
import CSSGlobalStyles from '~/styles/globals.css'
import { Poppins } from '@next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
        <CSSGlobalStyles />
      </ThemeProvider>
    </>
  )
}
