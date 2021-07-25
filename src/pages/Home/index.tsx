import { GoGear } from 'react-icons/go'

import { Button } from '../../components/Button'
import { Clock } from '../../components/Clock'
import { CurrentSound } from '../../components/CurrentSound'
import { SoundExplorer } from '../../components/SoundExplorer'
import { Container } from './styles'

export function HomePage() {
  return (
    <Container>
      <img
        src="https://images.ecycle.com.br/wp-content/uploads/2021/05/20195924/o-que-e-paisagem.jpg.webp"
        alt=""
      />
      <main>
        <header>
          <Button>
            <GoGear size={20} />
          </Button>
        </header>
        <Clock />
        <SoundExplorer />
        <CurrentSound />
      </main>
    </Container>
  )
}
