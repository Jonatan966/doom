import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { Button } from '../Button'
import { CalendarDate, Container, WeekDay } from './styles'

export function Calendar() {
  return (
    <Container shadow="inner" background="secondary">
      <>
        <Button>
          <GoArrowLeft size={25} />
        </Button>
        <h3>Janeiro - 2021</h3>
        <Button>
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

      <CalendarDate>1</CalendarDate>
      <CalendarDate className="selected">2</CalendarDate>
    </Container>
  )
}
