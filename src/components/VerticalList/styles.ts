import styled from 'styled-components'

import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;

  gap: 0.5rem;

  max-height: 18rem;
  min-height: 18rem;
  overflow-y: auto;

  h2 {
    flex: 1;
  }
`
