import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  padding: 1rem 0;

  > * {
    max-width: 960px;
    width: 100%;
  }

  > header {
    display: flex;
    align-items: center;

    padding-bottom: 1rem;

    > h1 {
      flex: 1;
      text-align: center;
    }
  }

  > main {
    max-width: 930px;

    article {
      > header {
        padding: 0.5rem 0;
        border-bottom: 2px solid black;
        margin-bottom: 0.5rem;

        display: flex;
        align-items: center;

        h2 {
          flex: 1;
        }
      }

      & + article {
        margin-top: 1.25rem;
      }
    }
  }
`
