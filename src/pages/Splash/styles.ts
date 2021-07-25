import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  img {
    width: 15rem;
    filter: drop-shadow(${ctx => ctx.theme.effects.shadow.primary});
  }
`
