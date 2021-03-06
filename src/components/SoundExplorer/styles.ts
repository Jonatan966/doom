import styled from 'styled-components'
import { lighten, desaturate } from 'polished'

import { Container as ButtonContainer } from '../Button/styles'

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  .delete-btn {
    background: ${() => desaturate(0.35, 'red')};
    color: ${ctx => ctx.theme.colors.text.secondary};
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;

  min-height: 2.625rem;
  margin-bottom: 0.5rem;

  h2 {
    flex: 1;
    text-align: center;

    color: ${ctx => ctx.theme.colors.box.primary};
  }
`

export const ExplorerItemCardContainer = styled.div`
  display: flex;
  background: ${ctx => lighten(0.2, ctx.theme.colors.box.primary)};

  border-radius: ${ctx => ctx.theme.effects.borderRadius};

  ${ButtonContainer}:first-child {
    flex: 1;
  }

  &.editable {
    ${ButtonContainer}:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .delete-btn {
    margin: 0.75rem;
  }
`
