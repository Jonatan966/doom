import { ReactNode } from 'react'

import { Container } from './styles'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
}

export function Button(props: ButtonProps) {
  return (
    <Container
      as="button"
      background="primary"
      shadow="outer"
      type="button"
      {...props}
    />
  )
}
