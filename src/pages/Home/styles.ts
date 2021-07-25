import styled from 'styled-components'
import { Container as ClockContainer } from '../../components/Clock/styles'

export const Container = styled.div`
  position: relative;

  > img {
    width: 60%;
    height: 100vh;
    object-fit: cover;

    position: fixed;
    left: 0;
  }

  > main {
    padding: 1rem;
    margin-left: 60%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    gap: 1.25rem;

    > header {
      display: flex;
      justify-content: flex-end;
    }
  }

  ${ClockContainer} {
    margin: auto;
  }
`
