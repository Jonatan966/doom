import { InputHTMLAttributes } from 'react'
import { Container } from './styles'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TextInput(props: TextInputProps) {
  return <Container {...props} />
}
