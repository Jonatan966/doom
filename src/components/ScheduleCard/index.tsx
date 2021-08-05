import { IconType } from 'react-icons/lib'
import { GoGear, GoCalendar } from 'react-icons/go'
import { MdFilter1, MdWbSunny } from 'react-icons/md'
import { ImEarth } from 'react-icons/im'
import dayjs from 'dayjs'

import { Button } from '../Button'
import { Container } from './styles'

import { FormattedSchedule } from '../../contexts/scheduleContext'

interface ScheduleCardProps {
  schedule: FormattedSchedule
}

const ScheduleModeIcons: Record<string, IconType> = {
  'only-once': MdFilter1,
  daily: MdWbSunny,
  monthly: GoCalendar,
  annually: ImEarth,
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  const formattedTime = dayjs(`2021-11-11 ${schedule?.targetTime}`).format(
    'HH:mm'
  )

  const ScheduleModeIcon = ScheduleModeIcons[schedule.mode]

  return (
    <Container shadow="outer" background="primary">
      <ScheduleModeIcon size={25} color="white" />
      <p>
        Tocar <strong>{schedule.sound.name || 'Sem nome'}</strong> <br />
        às <strong>{formattedTime} hrs</strong>
      </p>
      <Button>
        <GoGear size={20} />
      </Button>
    </Container>
  )
}
