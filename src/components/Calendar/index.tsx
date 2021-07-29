import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

import { Button } from '../Button'
import { CalendarDate, Container, WeekDay } from './styles'

interface CalendarProps {
  onSelectDate?: (date: Date) => Promise<void>
}

export function Calendar({ onSelectDate }: CalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const currentDate = new Date()

  const daysInCurrentMonth = selectedMonth.daysInMonth()

  const currentFullDate = dayjs(selectedMonth)
    .locale('pt-br')
    .format('MMMM - YYYY')

  const days = [...new Array(daysInCurrentMonth).keys()].map(
    day => day + 1
  ) as number[]

  const startOfSelectedMonth = selectedMonth.startOf('month').day()

  function goToNextMonth() {
    setSelectedMonth(oldMonth => oldMonth.add(1, 'month'))
  }

  function goToPreviousMonth() {
    setSelectedMonth(oldMonth => oldMonth.subtract(1, 'month'))
  }

  function handleSelectDate(day: number) {
    const newDate = dayjs(selectedMonth).set('date', day).toDate()

    setSelectedDate(newDate)
  }

  useEffect(() => {
    if (!onSelectDate) {
      return
    }
    onSelectDate(selectedDate)
  }, [selectedDate])

  return (
    <Container shadow="inner" background="secondary">
      <>
        {dayjs(selectedMonth).format('YYMM') !==
          dayjs(currentDate).format('YYMM') && (
          <Button onClick={goToPreviousMonth}>
            <GoArrowLeft size={25} />
          </Button>
        )}
        <h3>{currentFullDate}</h3>
        <Button onClick={goToNextMonth}>
          <GoArrowRight size={25} />
        </Button>
      </>

      <>
        <WeekDay>D</WeekDay>
        <WeekDay>S</WeekDay>
        <WeekDay>T</WeekDay>
        <WeekDay>Q</WeekDay>
        <WeekDay>Q</WeekDay>
        <WeekDay>S</WeekDay>
        <WeekDay>S</WeekDay>
      </>

      {[...new Array(startOfSelectedMonth).keys()].map(key => (
        <span key={`calendar-${key}`} />
      ))}

      {days.map(day => (
        <CalendarDate
          onClick={() => handleSelectDate(day)}
          className={
            dayjs(selectedMonth).set('date', day).format('YYMMDD') ===
            dayjs(selectedDate).format('YYMMDD')
              ? 'selected'
              : ''
          }
          key={`calendar-day-${day}`}
          disabled={
            selectedMonth.date() !== day &&
            dayjs(selectedMonth).set('date', day).isBefore(currentDate)
          }
        >
          {day}
        </CalendarDate>
      ))}
    </Container>
  )
}
