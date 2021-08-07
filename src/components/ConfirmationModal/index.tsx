import { useEffect, useState } from 'react'

import { Box } from '../../styles/Box'
import { AppModal, AppModalConfig } from '../AppModal'
import { AppModalBoxContainer } from '../AppModal/styles'
import { Button } from '../Button'
import { TextInput } from '../TextInput'
import { FooterContainer } from './styles'

interface ConfirmationModalProps extends AppModalConfig {
  title: string
  message: string
  onAccept: () => void
}

export function ConfirmationModal({
  onRequestClose = () => null,
  isOpen,
  title,
  message,
  onAccept,
}: ConfirmationModalProps) {
  const [isAbleToConfirm, setIsAbleToConfirm] = useState(false)

  useEffect(() => {
    setIsAbleToConfirm(false)
  }, [isOpen])

  return (
    <AppModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <AppModalBoxContainer>
        <header>
          <h2>{title}</h2>
        </header>
        <main>
          <Box as="p" background="secondary" shadow="inner">
            {message}
          </Box>
        </main>

        <FooterContainer>
          <TextInput
            placeholder='Digite "Estou ciente" para confirmar'
            onChange={event =>
              setIsAbleToConfirm(event.target.value === 'Estou ciente')
            }
          />
          <Button
            onClick={() => {
              onAccept()
              onRequestClose()
            }}
            disabled={!isAbleToConfirm}
          >
            Confirmar
          </Button>
        </FooterContainer>
      </AppModalBoxContainer>
    </AppModal>
  )
}
