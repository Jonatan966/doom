import { MdMusicNote } from 'react-icons/md'

import { Button } from '../Button'
import { ListContainer, Container, Header } from './styles'

export function SoundExplorer() {
  return (
    <Container>
      <Header>
        <Button>
          <h3>Voltar</h3>
        </Button>
        <h2>Teste</h2>
      </Header>
      <ListContainer background="secondary" shadow="inner">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <Button key={`btn-${item}`}>
            <MdMusicNote size={25} />
            <h2>bom dia</h2>
          </Button>
        ))}
      </ListContainer>
    </Container>
  )
}