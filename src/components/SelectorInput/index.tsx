import { useState, ReactNode } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { Button } from '../Button'

import { Container } from './styles'

type Option = {
  id: string
  children: ReactNode
}

interface SelectorInputProps {
  options: Option[]
}

interface SelectorOptionProps {
  option: Option
  onSelect?: (id: string) => void
}

export function SelectorOption({
  option: { id, children },
  onSelect = () => null,
}: SelectorOptionProps) {
  return (
    <li>
      <Button onClick={() => onSelect(id)}>{children}</Button>
    </li>
  )
}

export function SelectorInput({ options = [] }: SelectorInputProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.length ? options[0] : null
  )

  const toggleOpenState = () => setIsOpened(oldValue => !oldValue)
  const filteresOptions = options.filter(
    option => option.id !== selectedOption?.id
  )

  function handleSelectOption(id: string) {
    setSelectedOption(options.find(option => option.id === id) || null)
    toggleOpenState()
  }

  return (
    <Container
      background="primary"
      shadow="outer"
      className={isOpened ? 'opened' : ''}
    >
      <div className="selected-option" onClick={toggleOpenState}>
        {selectedOption?.children}
      </div>
      <MdArrowDropDown
        size={25}
        color="black"
        className="arrow"
        onClick={toggleOpenState}
      />

      <ul className="options">
        {filteresOptions.map(option => (
          <SelectorOption
            option={option}
            onSelect={handleSelectOption}
            key={option.id}
          />
        ))}
      </ul>
    </Container>
  )
}
