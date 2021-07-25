import styled from 'styled-components'

interface BoxProps {
  background: 'primary' | 'secondary'
  shadow: 'inner' | 'outer'
}

const shadowOptions = {
  inner: 'secondary' as 'secondary',
  outer: 'primary' as 'primary',
}

export const Box = styled.div<BoxProps>`
  padding: 0.5rem;
  background: ${ctx => ctx.theme.colors.box[ctx.background]};
  box-shadow: ${ctx => ctx.theme.effects.shadow[shadowOptions[ctx.shadow]]};
  border-radius: ${ctx => ctx.theme.effects.borderRadius};

  color: ${ctx =>
    ctx.background === 'primary'
      ? ctx.theme.colors.text.secondary
      : ctx.theme.colors.text.primary};
  text-align: center;
`
