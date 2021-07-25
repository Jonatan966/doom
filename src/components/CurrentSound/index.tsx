import { MdMusicNote, MdBlock } from 'react-icons/md'

import { Button } from '../Button'
import { Container } from './styles'

export function CurrentSound() {
  return (
    <Container background="secondary" shadow="inner">
      <MdMusicNote size={32} />
      <h1>Som tal</h1>
      <Button>
        <MdBlock size={25} />
        <h2>Parar</h2>
      </Button>
    </Container>
  )
}
