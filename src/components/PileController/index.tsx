import { useEffect, useState } from 'react'
import { MdAdd, MdFolder, MdMusicNote } from 'react-icons/md'

import { Button } from '../Button'
import { FileSelectorInput } from '../FileSelectorInput'
import { SelectorInput } from '../SelectorInput'
import { TextInput } from '../TextInput'
import { Container } from './styles'

interface PileControllerProps {
  targetPath: string
  onAfterAdd?: () => void
}

export function PileController({
  targetPath,
  onAfterAdd,
}: PileControllerProps) {
  const [additionType, setAdditionType] = useState('sound')
  const [soundFile, setSoundFile] = useState<File | null>(null)
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    setSoundFile(null)
    setFolderName('')
  }, [additionType])

  async function convertSoundFileToBase64(): Promise<string> {
    if (!soundFile) return ''

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(soundFile)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  function handleAfterAdd() {
    onAfterAdd?.()

    setSoundFile(null)
    setFolderName('')
  }

  async function handleAddSound() {
    if (!soundFile) return

    let base64Sound = await convertSoundFileToBase64()
    base64Sound = base64Sound.substr(base64Sound.indexOf(',') + 1)

    const soundData = {
      path: targetPath,
      data: base64Sound,
      name: soundFile.name,
    }

    window.Main.once('success-add-sound', () => {
      alert('Som adicionado com sucesso!')

      handleAfterAdd()
    })

    window.Main.sendMessage('add-sound', soundData)
  }

  function handleAddFolder() {
    window.Main.sendMessage('add-folder', `${targetPath}/${folderName}`)

    window.Main.once('success-add-folder', handleAfterAdd)
  }

  return (
    <Container shadow="inner" background="secondary">
      <SelectorInput
        onChange={newSelection => setAdditionType(newSelection.id)}
        options={[
          {
            id: 'sound',
            children: <MdMusicNote size={25} />,
          },
          {
            id: 'folder',
            children: <MdFolder size={25} />,
          },
        ]}
      />

      {additionType === 'folder' ? (
        <TextInput
          placeholder="Título da pasta"
          onChange={event => setFolderName(event.target.value)}
          value={folderName}
        />
      ) : (
        <FileSelectorInput
          acceptOnly="audio/*"
          onChange={file => {
            setSoundFile(file)
          }}
        />
      )}

      <Button
        onClick={additionType === 'sound' ? handleAddSound : handleAddFolder}
      >
        <MdAdd size={25} color="lightgreen" />
        <h2>Adicionar</h2>
      </Button>
    </Container>
  )
}
