import styled from 'styled-components'

export const Button = styled.button`
  padding: 4px;
  border: none;
  border-radius: 4px;
  color: ${p => p.theme.colors.button.content};
  background: ${p => p.theme.colors.background};

  transition: filter 70ms;

  & svg {
    width: 24px;
    height: 24px;
  }

  :hover {
    filter: brightness(0.9);
  }

  :active {
    filter: brightness(0.8);
    transition: filter 50ms;
  }
`
