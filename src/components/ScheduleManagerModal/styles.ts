import styled from 'styled-components'

export const BoxContainer = styled.div`
  header {
    display: flex;

    h2 {
      margin: auto;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    margin: 1.5rem 0;

    article {
      text-align: start;
      color: ${ctx => ctx.theme.colors.box.primary};
    }
  }
`
