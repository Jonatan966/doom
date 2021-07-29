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

    &:not(:disabled):hover {
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

    &:disabled {
      /* background: gray;
      color: #333333; */
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${ctx => ctx.theme.colors.text.secondary};
  border-radius: ${ctx => ctx.theme.effects.borderRadius};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${ctx => ctx.theme.colors.box.primary};
  border-radius: ${ctx => ctx.theme.effects.borderRadius};

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #335e99;
}
`
