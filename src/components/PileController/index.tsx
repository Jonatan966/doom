import { MdAdd, MdFolder, MdMusicNote } from 'react-icons/md'

import { Button } from '../Button'
import { SelectorInput } from '../SelectorInput'
import { Container } from './styles'

export function PileController() {
  return (
    <Container shadow="inner" background="secondary">
      <SelectorInput
        options={[
          {
            id: 'sound',
            children: <MdMusicNote size={25} />,
          },
          {
            id: 'folder',
            children: <MdFolder size={25} />,
          },
        ]}
      />

      <input placeholder="Título do som/pasta" />
      <Button>
        <MdAdd size={25} color="lightgreen" />
        <h2>Adicionar</h2>
      </Button>
    </Container>
  )
}
