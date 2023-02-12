import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '~/styles/theme'
import CSSGlobalStyles from '~/styles/globals.css'
import { Poppins } from '@next/font/google'
import { Provider as AtomProvider } from 'jotai'
import { Analytics } from '@vercel/analytics/react'

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <AtomProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
          <Analytics />
          <CSSGlobalStyles />
        </ThemeProvider>
      </AtomProvider>
    </>
  )
}
