import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { ExplorerItem } from '../../@types/explorerItem'
import { ConfirmationModal } from '../ConfirmationModal'

import { PileController } from '../PileController'
import { SoundExplorer } from '../SoundExplorer'

export function PileManager() {
  const [currentPath, setCurrentPath] = useState('')
  const [isConfirmItemDeletionModalOpen, setIsConfirmItemDeletionModalOpen] =
    useState(false)
  const [selectedExplorerItem, setSelectedExplorerItem] =
    useState<ExplorerItem | null>(null)
  const [reloadSoundExplorerTrigger, setReloadSoundExplorerTrigger] =
    useState(0)

  function handleOpenConfirmItemDeletionModal(explorerItem: ExplorerItem) {
    setSelectedExplorerItem(explorerItem)

    setIsConfirmItemDeletionModalOpen(true)
  }

  const callReloadSoundExplorerTrigger = () =>
    setReloadSoundExplorerTrigger(new Date().getTime())

  function handleDeleteExplorerItem() {
    if (!selectedExplorerItem) return

    window.Main.sendMessage('delete-explorer-item', selectedExplorerItem)
    window.Main.once('retrieve-delete-explorer-item', (success: boolean) => {
      if (!success) {
        return toast.error('Não foi possível deletar esse item')
      }

      toast.success('Item deletado com sucesso!')
      callReloadSoundExplorerTrigger()
    })
  }

  const translatedExplorerItemType = {
    folder: 'a pasta',
    sound: 'o som',
    other: 'o item',
  }[selectedExplorerItem?.type ?? 'other']

  return (
    <article>
      <header>
        <h2>Acervo</h2>
      </header>
      <ConfirmationModal
        isOpen={isConfirmItemDeletionModalOpen}
        title="Remover item"
        message={`Tem certeza de que deseja remover ${translatedExplorerItemType} "${selectedExplorerItem?.name}"? Essa ação não poderá ser desfeita`}
        onRequestClose={() => setIsConfirmItemDeletionModalOpen(false)}
        onAccept={handleDeleteExplorerItem}
      />
      <SoundExplorer
        onRequestRemove={handleOpenConfirmItemDeletionModal}
        onNavigate={path => setCurrentPath(path)}
        reloadPathTrigger={reloadSoundExplorerTrigger}
      />
      <PileController
        targetPath={currentPath}
        onAfterAdd={callReloadSoundExplorerTrigger}
      />
    </article>
  )
}
