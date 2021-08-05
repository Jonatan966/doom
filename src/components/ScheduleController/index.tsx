import { useState } from 'react'
import { FaRegCalendarTimes } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'

import { Calendar } from '../Calendar'
import { ScheduleCard } from '../ScheduleCard'
import { VerticalList } from '../VerticalList'
import { Button } from '../Button'

import { FormattedSchedule, useSchedule } from '../../contexts/scheduleContext'
import { NotFoundMessage } from './styles'
import { ScheduleManagerModal } from '../ScheduleManagerModal'

export function ScheduleController() {
  const [currentScheduleList, setCurrentScheduleList] = useState<
    FormattedSchedule[]
  >([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isScheduleManagerModalOpen, setIsScheduleManagerModalOpen] =
    useState(false)
  const { loadSchedulesByDate } = useSchedule()

  async function handleSelectDate(newDate: Date) {
    setSelectedDate(newDate)
    const schedules = await loadSchedulesByDate(newDate)

    setCurrentScheduleList(schedules)
  }

  return (
    <article>
      <header>
        <h2>Programação</h2>
        <Button onClick={() => setIsScheduleManagerModalOpen(true)}>
          <MdAdd size={25} color="lightgreen" />
          <h2>Adicionar</h2>
        </Button>
        <ScheduleManagerModal
          selectedDate={selectedDate}
          onRequestClose={() => {
            handleSelectDate(selectedDate)
            setIsScheduleManagerModalOpen(false)
          }}
          isOpen={isScheduleManagerModalOpen}
        />
      </header>

      <section className="h-flex">
        <Calendar onSelectDate={handleSelectDate} />
        <VerticalList>
          <h3>{selectedDate.toLocaleDateString()}</h3>
          {currentScheduleList.length === 0 ? (
            <NotFoundMessage>
              <FaRegCalendarTimes size={35} />
              <strong>Sem cadastros</strong>
            </NotFoundMessage>
          ) : (
            currentScheduleList.map(schedule => (
              <ScheduleCard
                schedule={schedule}
                key={`schedule-${schedule.id}`}
              />
            ))
          )}
        </VerticalList>
      </section>
    </article>
  )
}
