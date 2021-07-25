import { useState, useEffect } from 'react'

import clockHourPointerImg from '../../assets/pointer-clock-hour.png'
import clockMinutePointerImg from '../../assets/pointer-clock-minute.png'

import { Container, Pointer } from './styles'

export function Clock() {
  const [currentTimeAngles, setCurrentTimeAngles] = useState({
    hour: 0,
    minute: 0,
  })

  useEffect(() => {
    function handleSetCurrentTime() {
      const currentDatetime = new Date()

      setCurrentTimeAngles({
        hour: currentDatetime.getHours() * 15,
        minute: currentDatetime.getMinutes() * 6,
      })
    }

    handleSetCurrentTime()

    const ONE_SECOND = 1000
    const interval = setInterval(handleSetCurrentTime, ONE_SECOND)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <Pointer
        rotationAngle={currentTimeAngles.hour}
        src={clockHourPointerImg}
        alt="Ponteiro da hora"
        className="hour"
      />
      <Pointer
        rotationAngle={currentTimeAngles.minute}
        src={clockMinutePointerImg}
        alt="Ponteiro do minuto"
        className="minute"
      />
    </Container>
  )
}
