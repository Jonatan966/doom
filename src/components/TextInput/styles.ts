import styled from 'styled-components'

export const Container = styled.input`
  width: 100%;

  padding: 0.5rem;
  background: ${ctx => ctx.theme.colors.text.secondary};

  border: none;
  border-radius: ${ctx => ctx.theme.effects.borderRadius};
  box-shadow: ${ctx => ctx.theme.effects.shadow.primary};

  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${ctx => ctx.theme.colors.box.primary};
`
