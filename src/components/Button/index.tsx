import { ReactNode, HTMLAttributes, DetailedHTMLProps } from 'react'

import { Container } from './styles'

interface ButtonProps
  extends Pick<
    DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement & HTMLButtonElement>,
      HTMLDivElement & HTMLButtonElement
    >,
    'onClick' | 'className'
  > {
  children: ReactNode
  centeredText?: boolean
}

export function Button({
  className,
  centeredText = false,
  ...props
}: ButtonProps) {
  return (
    <Container
      as="button"
      background="primary"
      shadow="outer"
      type="button"
      className={`${className || ''} ${centeredText ? 'centered-txt' : ''}`}
      {...props}
    />
  )
}
