import styled from 'styled-components'
import { Box } from '../../styles/Box'

export const Container = styled(Box)`
  display: flex;
  align-items: center;

  padding: 0;
  background: ${ctx => ctx.theme.colors.text.secondary};

  position: relative;

  .arrow,
  .selected-option {
    cursor: pointer;
  }

  .selected-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;

    padding: 0 0.75rem;
    background: ${ctx => ctx.theme.colors.box.primary};

    border-radius: ${ctx => ctx.theme.effects.borderRadius};

    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .options {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);

    display: none;

    background: ${ctx => ctx.theme.colors.text.secondary};
    color: ${ctx => ctx.theme.colors.text.secondary};

    padding: 0.25rem;
    border-radius: ${ctx => ctx.theme.effects.borderRadius};
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    list-style: none;

    li {
      & + li {
        margin-top: 0.25rem;
      }

      button {
        width: 100%;
        justify-content: center;
      }
    }
  }

  &.opened {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    .selected-option {
      border-bottom-left-radius: 0;
    }

    .options {
      display: block;
    }

    .arrow {
      transform: rotate(180deg);
    }
  }
`
