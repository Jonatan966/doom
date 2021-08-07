import styled from 'styled-components'

import { Container as FileSelectorInputContainer } from '../FileSelectorInput/styles'
import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  gap: 0.5rem;

  margin-top: 0.5rem;

  ${FileSelectorInputContainer} {
    flex: 1;
  }
`
