import { useEffect } from 'react'
import { GoGear } from 'react-icons/go'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Clock } from '../../components/Clock'
import { CurrentSound } from '../../components/CurrentSound'
import { SoundExplorer } from '../../components/SoundExplorer'
import { Container } from './styles'

export function HomePage() {
  const history = useHistory()

  useEffect(() => {
    window.Main.sendMessage('sound-list')

    const teste = console.log
    window.Main.once('retrieve-sound-list', teste)
  }, [])

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
        <CurrentSound />
      </main>
    </Container>
  )
}
