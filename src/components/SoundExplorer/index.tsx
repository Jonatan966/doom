import { useEffect, useState } from 'react'
import { GoTrashcan } from 'react-icons/go'

import { MdMusicNote, MdFolder } from 'react-icons/md'
import { CurrentSound } from '../../@types/currentSound'
import { ExplorerItem } from '../../@types/explorerItem'
import { usePlayer } from '../../contexts/playerContext'

import { Button } from '../Button'
import { VerticalList } from '../VerticalList'
import { Container, ExplorerItemCardContainer, Header } from './styles'

interface SoundExplorerProps {
  ableToPlaySound?: boolean
  ableToRemoveItem?: boolean
  onSelect?: (currentSound: CurrentSound) => void
  onNavigate?: (path: string) => void
  className?: string
  reloadPathTrigger?: number
}

interface ExplorerItemCardProps extends ExplorerItem {
  onNavigate?: () => void
  onRemove?: () => void
  onSelect?: () => void
}

function ExplorerItemCard({
  name,
  type,
  onNavigate,
  onSelect,
  onRemove,
}: ExplorerItemCardProps) {
  return (
    <ExplorerItemCardContainer className={onRemove ? 'editable' : ''}>
      <Button onClick={type === 'folder' ? onNavigate : onSelect}>
        {type === 'sound' && <MdMusicNote size={25} />}
        {type === 'folder' && <MdFolder size={25} />}
        <h2>{name}</h2>
      </Button>
      {onRemove && (
        <Button className="delete-btn" onClick={onRemove}>
          <GoTrashcan size={20} />
        </Button>
      )}
    </ExplorerItemCardContainer>
  )
}

export function SoundExplorer({
  ableToPlaySound,
  ableToRemoveItem,
  onSelect,
  onNavigate,
  className,
  reloadPathTrigger = 0,
}: SoundExplorerProps) {
  const [currentSoundPath, setCurrentSoundPath] = useState('/')
  const [soundList, setSoundList] = useState<ExplorerItem[]>([])
  const { playSound } = usePlayer()

  function handleRetrieveSounds(list: ExplorerItem[]) {
    setSoundList(list)
  }

  function handleNavigateToFolder(folder: string) {
    const filteredFolder = `/${folder}`
      .replace(/(\\)/g, '/')
      .replace(/(\/\/)/g, '/')
    setCurrentSoundPath(filteredFolder)
  }

  function handleBackPath() {
    setCurrentSoundPath(oldPath =>
      oldPath.substring(oldPath.lastIndexOf('/'), 0)
    )
  }

  function loadSoundList() {
    window.Main.sendMessage('sound-list', currentSoundPath)
    window.Main.once('retrieve-sound-list', handleRetrieveSounds)

    onNavigate?.(currentSoundPath)
  }

  function handleRemoveExplorerItem(explorerItem: ExplorerItem) {}

  useEffect(loadSoundList, [currentSoundPath])

  useEffect(() => {
    if (!reloadPathTrigger) return

    loadSoundList()
  }, [reloadPathTrigger])

  return (
    <Container className={className || ''}>
      <Header>
        {!['/', ''].includes(currentSoundPath) && (
          <Button onClick={handleBackPath}>
            <h3>Voltar</h3>
          </Button>
        )}
        <h2>Raiz{currentSoundPath}</h2>
      </Header>
      <VerticalList>
        {soundList.map(explorerItem => (
          <ExplorerItemCard
            key={explorerItem.name}
            onSelect={() => {
              const currentSound = {
                path: explorerItem.path,
                name: explorerItem.name,
              }

              if (ableToPlaySound) {
                playSound(currentSound)
                return
              }

              if (!onSelect) return

              onSelect(currentSound)
            }}
            onNavigate={() => handleNavigateToFolder(explorerItem.path)}
            onRemove={
              ableToRemoveItem
                ? () => handleRemoveExplorerItem(explorerItem)
                : undefined
            }
            {...explorerItem}
          />
        ))}
      </VerticalList>
    </Container>
  )
}
