import styled from 'styled-components'

export const Container = styled.div`
  background: ${ctx => ctx.theme.colors.text.secondary};
  padding: 0.5rem;

  border: 2px solid black;
  border-radius: ${ctx => ctx.theme.effects.borderRadius};

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  &.not-selected {
    cursor: pointer;
    transition: filter 0.2s;
    border: none;

    &:hover {
      filter: brightness(0.85);
    }

    button {
      display: none;
    }
  }

  &:not(.not-selected) {
    strong {
      flex: 1;
      text-align: center;
    }

    button {
      background: none;
      font-weight: bolder;

      color: red;
    }
  }
`
