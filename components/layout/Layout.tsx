import { ReactElement, ReactNode, ReactPropTypes } from 'react'
import styled from 'styled-components'

export function Layout({ children }: { children: ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}

const LayoutWrapper = styled.main`
  height: 100%;
  width: 100%;
  background: ${p => p.theme.colors.background};
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  align-items: center;
`
