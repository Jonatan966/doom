import { MdMusicNote, MdBlock } from 'react-icons/md'

import { usePlayer } from '../../contexts/playerContext'

import { Button } from '../Button'
import { Container } from './styles'

export function CurrentSoundBox() {
  const { currentSound, loadingSound, stopCurrentSound } = usePlayer()

  return (
    <Container background="secondary" shadow="inner">
      {loadingSound ? (
        <h1>Carregando. . .</h1>
      ) : currentSound ? (
        <>
          <MdMusicNote size={32} />
          <h1>Tocando: {currentSound?.name}</h1>
        </>
      ) : (
        <h1>Esperando</h1>
      )}
      <Button onClick={stopCurrentSound}>
        <MdBlock size={25} />
        <h2>Parar</h2>
      </Button>
    </Container>
  )
}
