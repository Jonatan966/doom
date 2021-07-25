import { FC } from 'react'

import { Container } from './styles'

export const VerticalList: FC = ({ children }) => {
  return <Container shadow="inner" background="secondary" children={children} />
}
