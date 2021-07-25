import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import teste from '../../assets/bell.gif'
import { Container } from './styles'

export function SplashPage() {
  const router = useHistory()
  useEffect(() => {
    setTimeout(() => {
      router.replace('/home')
    }, 60 * 60 * 3)
  }, [])

  return (
    <Container>
      <img src={teste} alt="Sino" />
    </Container>
  )
}
