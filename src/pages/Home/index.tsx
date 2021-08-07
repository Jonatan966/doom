import { GoGear } from 'react-icons/go'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Clock } from '../../components/Clock'
import { CurrentSoundBox } from '../../components/CurrentSoundBox'
import { SoundExplorer } from '../../components/SoundExplorer'
import { Container } from './styles'

export function HomePage() {
  const history = useHistory()

  return (
    <Container>
      <img
        src="https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg.webp"
        alt=""
      />
      <main>
        <header>
          <Button onClick={() => history.push('/config')}>
            <GoGear size={20} />
          </Button>
        </header>
        <Clock />
        <SoundExplorer ableToPlaySound />
        <CurrentSoundBox />
      </main>
    </Container>
  )
}
