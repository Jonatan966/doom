import { useEffect, useState } from 'react'
import { GoTrashcan } from 'react-icons/go'

import { MdMusicNote, MdFolder } from 'react-icons/md'
import { ExplorerItem } from '../../@types/explorerItem'
import { usePlayer } from '../../contexts/playerContext'

import { Button } from '../Button'
import { VerticalList } from '../VerticalList'
import { Container, Header } from './styles'

interface SoundExplorerProps {
  ableToPlaySound?: boolean
  ableToRemoveItem?: boolean
}

export function SoundExplorer({
  ableToPlaySound,
  ableToRemoveItem,
}: SoundExplorerProps) {
  const [currentSoundPath, setCurrentSoundPath] = useState('/')
  const [soundList, setSoundList] = useState<ExplorerItem[]>([])
  const { playSound } = usePlayer()

  function handleRetrieveSounds(list: ExplorerItem[]) {
    setSoundList(list)
  }

  function handleNavigateToFolder(folder: string) {
    setCurrentSoundPath(`/${folder}`)
  }

  function handleBackPath() {
    setCurrentSoundPath(oldPath =>
      oldPath.substring(oldPath.lastIndexOf('/'), 0)
    )
  }

  function handleRemoveExplorerItem(explorerItem: ExplorerItem) {}

  useEffect(() => {
    window.Main.sendMessage('sound-list', currentSoundPath)
    window.Main.once('retrieve-sound-list', handleRetrieveSounds)
  }, [currentSoundPath])

  return (
    <Container>
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
          <Button
            key={explorerItem.name}
            onClick={
              explorerItem.type === 'folder'
                ? () => handleNavigateToFolder(explorerItem.name)
                : ableToPlaySound
                ? () =>
                    playSound({
                      path: `${currentSoundPath}/${explorerItem.name}`,
                      name: explorerItem.name,
                    })
                : () => null
            }
          >
            {explorerItem.type === 'sound' && <MdMusicNote size={25} />}
            {explorerItem.type === 'folder' && <MdFolder size={25} />}
            <h2>{explorerItem.name}</h2>
            {ableToRemoveItem && (
              <Button
                onClick={event => {
                  event.stopPropagation()
                  handleRemoveExplorerItem(explorerItem)
                }}
                className="delete-btn"
              >
                <GoTrashcan size={20} />
              </Button>
            )}
          </Button>
        ))}
      </VerticalList>
    </Container>
  )
}
