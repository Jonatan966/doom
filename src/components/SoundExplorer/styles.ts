import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Header = styled.header`
  display: flex;
  align-items: center;

  h2 {
    flex: 1;
    text-align: center;

    color: ${ctx => ctx.theme.colors.box.primary};
  }
`
