import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: ${ctx => ctx.theme.colors.text.primary};
  }

  #root {
    min-height: 100vh;
    background: ${ctx => ctx.theme.colors.background};
  }

  button {
    cursor: pointer;
    transition: filter 0.25s;
    border: none;

    &:hover {
      filter: brightness(0.85);
    }

    > * {
      transition: transform 0.2s;
    }

    &:active {
      > * {
        transform: translateY(10%);
      }
    }
  }
`
