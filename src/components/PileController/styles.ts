import styled from 'styled-components'

import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  gap: 0.5rem;

  margin-top: 0.5rem;

  input {
    flex: 1;
    border-radius: ${ctx => ctx.theme.effects.borderRadius};
    border: 2px solid ${ctx => ctx.theme.colors.box.primary};

    padding: 0 1rem;
    font-size: 1.5rem;
    color: ${ctx => ctx.theme.colors.box.primary};
    text-align: center;
  }
`
