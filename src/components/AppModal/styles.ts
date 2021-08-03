import { css } from 'styled-components'

export const AppModalStyles = css`
  .app-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(0, 0, 0, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-modal-content {
    background: ${ctx => ctx.theme.colors.background};

    max-width: 960px;
    width: 100%;
    margin: 0 1.5rem;

    padding: 1rem;
    border-radius: ${ctx => ctx.theme.effects.borderRadius};
  }
`
