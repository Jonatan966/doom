import { FormEvent, useState } from 'react'
import { MdBlock, MdCheckCircle } from 'react-icons/md'
import dayjs from 'dayjs'

import { AppModal, AppModalConfig } from '../AppModal'
import { Button } from '../Button'
import { SelectorInput } from '../SelectorInput'
import { SoundExplorer } from '../SoundExplorer'
import { TextInput } from '../TextInput'
import { BoxContainer } from './styles'
import { FormattedSchedule, useSchedule } from '../../contexts/scheduleContext'

interface ScheduleManagerModalProps extends AppModalConfig {
  selectedDate: Date
}

export function ScheduleManagerModal({
  selectedDate,
  onRequestClose = () => null,
  isOpen,
}: ScheduleManagerModalProps) {
  const { addSchedule } = useSchedule()

  const [currentDate, setCurrentDate] = useState(
    dayjs(selectedDate).format('YYYY-MM-DD')
  )
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'))
  const [mode, setMode] = useState<FormattedSchedule['mode']>('only-once')
  const [soundPath, setSoundPath] = useState('')
  const [reproductions, setReproductions] = useState(1)

  async function handleAddSchedule(event: FormEvent) {
    event.preventDefault()

    let formattedDate = currentDate

    if (mode === 'annually') {
      formattedDate = dayjs(currentDate).format('MM-DD')
    }

    if (mode === 'monthly') {
      formattedDate = dayjs(currentDate).get('date').toString()
    }

    await addSchedule({
      mode,
      reproductions,
      sound: soundPath,
      targetDate: formattedDate,
      targetTime: currentTime,
    })

    // closeModal()
  }

  return (
    <AppModal onRequestClose={onRequestClose} isOpen={isOpen}>
      <BoxContainer>
        <header>
          <h2>Adicionar novo horário</h2>
        </header>
        <form onSubmit={handleAddSchedule}>
          <main>
            <article className="h-flex">
              <section>
                <h3>Horário</h3>
                <TextInput
                  type="time"
                  value={currentTime}
                  onChange={event => setCurrentTime(event.target.value)}
                />
              </section>
              <section>
                <h3>Data</h3>
                <TextInput
                  type="date"
                  value={currentDate}
                  onChange={event => setCurrentDate(event.target.value)}
                />
              </section>
            </article>

            <article>
              <h3>Modo</h3>
              <SelectorInput
                onChange={newMode =>
                  setMode(newMode.id as FormattedSchedule['mode'])
                }
                options={[
                  {
                    children: <strong>Apenas uma vez</strong>,
                    id: 'only-once',
                  },
                  {
                    children: <strong>Diariamente</strong>,
                    id: 'daily',
                  },
                  {
                    children: <strong>Mensalmente</strong>,
                    id: 'monthly',
                  },
                  {
                    children: <strong>Anualmente</strong>,
                    id: 'annually',
                  },
                ]}
              />
            </article>

            <article className="h-flex">
              <section>
                <h3>Som</h3>
                <SelectorInput
                  onChange={newSound => setSoundPath(newSound.id)}
                  options={[
                    {
                      id: '-1',
                      children: <strong>Selecione um som</strong>,
                    },
                  ]}
                >
                  {selectOption => (
                    <SoundExplorer
                      className="options"
                      onSelect={currentSound =>
                        selectOption({
                          id: currentSound.path,
                          children: <strong>{currentSound.name}</strong>,
                        })
                      }
                    />
                  )}
                </SelectorInput>
              </section>
              <section>
                <h3>Reproduções</h3>
                <TextInput
                  type="number"
                  min={1}
                  value={reproductions}
                  onChange={event =>
                    setReproductions(event.target.valueAsNumber)
                  }
                />
              </section>
            </article>
          </main>

          <footer className="h-flex">
            <Button centeredText onClick={onRequestClose}>
              <MdBlock size={25} color="red" />
              <h2>Cancelar</h2>
            </Button>
            <Button centeredText type="submit">
              <MdCheckCircle size={25} color="green" />
              <h2>Finalizar</h2>
            </Button>
          </footer>
        </form>
      </BoxContainer>
    </AppModal>
  )
}
