import styled from 'styled-components'
import { Container as ButtonContainer } from '../Button/styles'

import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(8, 1fr);

  gap: 0.25rem;

  h3 {
    grid-column-start: 2;
    grid-column-end: 7;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${ButtonContainer} {
    padding: 0.25rem;
    justify-content: center;
  }
`

export const WeekDay = styled.div`
  background: ${ctx => ctx.theme.colors.box.primary};
  border-radius: ${ctx => ctx.theme.effects.borderRadius};

  color: ${ctx => ctx.theme.colors.background};
  font-size: 1.5rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const CalendarDate = styled.button`
  padding: 0.25rem;
  border-radius: ${ctx => ctx.theme.effects.borderRadius};
  background: ${ctx => ctx.theme.colors.background};

  font-size: 1.5rem;
  font-weight: bold;
  color: ${ctx => ctx.theme.colors.box.primary};

  &.selected {
    background: ${ctx => ctx.theme.colors.text.secondary};
    border: 3px solid ${ctx => ctx.theme.colors.background};
  }
`
