import { GoArrowLeft } from 'react-icons/go'
import { MdAdd } from 'react-icons/md'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'
import { PileController } from '../../components/PileController'
import { ScheduleCard } from '../../components/ScheduleCard'
import { SoundExplorer } from '../../components/SoundExplorer'
import { VerticalList } from '../../components/VerticalList'

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
        <article>
          <header>
            <h2>Acervo</h2>
          </header>
          <SoundExplorer ableToRemoveItem />
          <PileController />
        </article>

        <article>
          <header>
            <h2>Programação</h2>
            <Button>
              <MdAdd size={25} color="lightgreen" />
              <h2>Adicionar</h2>
            </Button>
          </header>

          <section className="h-flex">
            <Calendar />
            <VerticalList>
              <ScheduleCard />
              <ScheduleCard />
              <ScheduleCard />
            </VerticalList>
          </section>
        </article>

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
