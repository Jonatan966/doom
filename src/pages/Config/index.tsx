import { GoArrowLeft } from 'react-icons/go'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { PileManager } from '../../components/PileManager'
import { ScheduleController } from '../../components/ScheduleController'

import { Container } from './styles'

export function ConfigPage() {
  const history = useHistory()

  return (
    <Container>
      <header>
        <Button onClick={() => history.goBack()}>
          <GoArrowLeft size={25} />
          <h2>Voltar</h2>
        </Button>
        <h1>Configurações</h1>
      </header>

      <main>
        <PileManager />

        <ScheduleController />

        <article>
          <header>
            <h2>Opções sensíveis</h2>
          </header>
          <section className="h-flex">
            <Button>
              <h2>APAGAR TUDO</h2>
            </Button>
            <Button>
              <h2>Desativar timer</h2>
            </Button>
          </section>
        </article>
      </main>
    </Container>
  )
}
