import { GoGear } from 'react-icons/go'

import { Button } from '../Button'
import { Container } from './styles'

export function ScheduleCard() {
  return (
    <Container shadow="outer" background="primary">
      <p>Um teste</p>
      <Button>
        <GoGear size={20} />
      </Button>
    </Container>
  )
}
