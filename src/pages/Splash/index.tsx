import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import teste from '../../assets/bell.gif'
import { Container } from './styles'

export function SplashPage() {
  const router = useHistory()
  useEffect(() => {
    window.Main.on('finish-check-resources', () =>
      setTimeout(() => router.replace('/home'), 1500)
    )
    window.Main.sendMessage('check-resources')
  }, [])

  return (
    <Container>
      <img src={teste} alt="Sino" />
    </Container>
  )
}
