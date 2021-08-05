import { ReactNode } from 'react'
import Modal from 'react-modal'

export type AppModalContent = (closeModal: () => void) => ReactNode

export interface AppModalConfig {
  isOpen?: boolean
  onRequestClose?: () => void
}

interface AppModalProps extends AppModalConfig {
  children?: ReactNode
}

export function AppModal({
  onRequestClose,
  children,
  isOpen = false,
}: AppModalProps) {
  function onModalOpen() {
    document.body.classList.add('overflow-hidden')
  }

  function onModalClose() {
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onModalOpen}
      onRequestClose={onRequestClose}
      onAfterClose={onModalClose}
      overlayClassName="app-modal-overlay"
      className="app-modal-content"
      children={children}
    />
  )
}
