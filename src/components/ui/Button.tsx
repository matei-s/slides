import styled from 'styled-components'

export const Button = styled.button`
  padding: 6px;
  border: none;
  border-radius: 4px;
  color: ${p => p.theme.colors.button.content};
  background: ${p => p.theme.colors.background};

  transition: filter 100ms;

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
    inset: -10px;
  }
`
