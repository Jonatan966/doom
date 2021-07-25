import styled from 'styled-components'

import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  align-items: center;

  p {
    flex: 1;
    text-align: center;
  }

  button {
    background: ${ctx => ctx.theme.colors.text.secondary};
    color: ${ctx => ctx.theme.colors.box.primary};
  }
`
