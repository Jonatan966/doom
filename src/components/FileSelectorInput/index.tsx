import { useState, useRef } from 'react'

import { Container } from './styles'

const notSelectedFile = {
  name: 'Clique para selecionar um arquivo',
  path: '-1',
}

interface FileSelectorInputProps {
  onChange?: (file: File | null) => void
  acceptOnly?: string
}

export function FileSelectorInput({
  onChange,
  acceptOnly,
}: FileSelectorInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<
    File | Pick<File, 'name' | 'path'>
  >(notSelectedFile)

  function openFileSelection() {
    if (!fileInputRef.current) return
    fileInputRef.current.click()
  }

  function onFileSelected() {
    if (!fileInputRef.current || !fileInputRef.current.files) return

    const newSelection = fileInputRef.current.files[0]

    setSelectedFile(newSelection)

    onChange?.(newSelection)
  }

  function onRemoveSelection() {
    setSelectedFile(notSelectedFile)
    onChange?.(null)

    if (!fileInputRef.current) return

    fileInputRef.current.src = ''
  }

  return (
    <Container
      {...(selectedFile.path === '-1'
        ? {
            className: 'not-selected',
            onClick: openFileSelection,
          }
        : {})}
      onChange={onFileSelected}
    >
      <input ref={fileInputRef} type="file" accept={acceptOnly} />
      <strong>{selectedFile.name}</strong>
      <button onClick={onRemoveSelection}>Remover</button>
    </Container>
  )
}
