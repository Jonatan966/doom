import styled from 'styled-components'

import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  padding: 0.75rem;

  &.centered-txt {
    h1,
    h2,
    h3 {
      flex: 1;
    }
  }
`
