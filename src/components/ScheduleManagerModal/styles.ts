import styled from 'styled-components'
import { AppModalBoxContainer } from '../AppModal/styles'

export const BoxContainer = styled(AppModalBoxContainer)`
  main {
    article {
      text-align: start;
      color: ${ctx => ctx.theme.colors.box.primary};
    }
  }
`
