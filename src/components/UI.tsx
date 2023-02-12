import Link from 'next/link'
import styled from 'styled-components'
import { sourceCodePro } from './MDXEditor'
import * as colors from '@radix-ui/colors'

export const Button = styled.button`
  padding: 6px;
  border: none;
  border-radius: 4px;
  color: ${p => p.theme.colors.button.content};
  background: ${p => p.theme.colors.background};
  position: relative;

  transition: filter 100ms;
  cursor: pointer;

  & svg {
    width: 28px;
    height: 28px;
  }

  :hover {
    filter: brightness(0.9);
  }

  :active {
    filter: brightness(0.8);
    transition: filter 50ms;
  }

  :after {
    content: '';
    position: absolute;
    inset: -4px;
  }
`

export const BackLink = styled(Link)`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  color: ${p => p.theme.colors.slate12};
  align-items: center;
  padding: 8px;
  gap: 8px;
  font-size: 1rem;
  transition: background-color, 100ms;
  border-radius: 4px;

  :hover {
    background: ${p => p.theme.colors.slate5};
  }

  :active {
    background: ${p => p.theme.colors.slate8};
  }
`

export const PageContent = styled.div`
  & > h1 {
    margin-bottom: 2rem;
  }

  & > h1 + p {
    margin-top: -1rem;
  }

  & > h1 ~ p + h2 {
    margin-top: 3rem;
  }

  & > h2 {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  & > h2:not(:first-of-type) {
    margin-top: 3rem;
  }

  & > p {
    margin-top: 1.5rem;
  }

  & ul {
    margin-top: 0.5rem;
  }

  & li {
    margin-bottom: 0.5rem;
  }

  & a {
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: opacity 100ms;

    :hover {
      opacity: 0.5;
    }
  }

  & code {
    padding: 0px 4px;
    border-radius: 4px;
    font-family: ${sourceCodePro.style.fontFamily};
    font-size: 1rem;
    border: 1px solid ${p => p.theme.colors.slate7};
    font-weight: 500;
  }

  & pre {
    border: 1px solid ${p => p.theme.colors.slate8};
    border-radius: 8px;
    padding: 12px 16px;
    margin-top: 1rem;
    background-color: ${p => p.theme.colors.slate3};
  }

  & pre > code {
    border: none;
    padding: 0;
  }
`
