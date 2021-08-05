import { useState, ReactNode } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { Button } from '../Button'

import { Container } from './styles'

export type Option = {
  id: string
  aditional?: any
  children: ReactNode
}

interface SelectorInputProps {
  options: Option[]
  onChange?: (selectedOption: Option) => void
  children?: (selectOption: (option: Option) => void) => ReactNode
}

interface SelectorOptionProps {
  option: Option
  onSelect?: (option: Option) => void
}

export function SelectorOption({
  option,
  onSelect = () => null,
}: SelectorOptionProps) {
  return (
    <li>
      <Button onClick={() => onSelect(option)}>{option.children}</Button>
    </li>
  )
}

export function SelectorInput({
  options = [],
  onChange,
  children: customOptions,
}: SelectorInputProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.length ? options[0] : null
  )

  const toggleOpenState = () => setIsOpened(oldValue => !oldValue)
  const filteresOptions = options.filter(
    option => option.id !== selectedOption?.id
  )

  function handleSelectOption(newSelection: Option) {
    if (newSelection && onChange) {
      onChange(newSelection)
    }

    setSelectedOption(newSelection)
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

      {customOptions ? (
        customOptions(handleSelectOption)
      ) : (
        <ul className="options">
          {filteresOptions.map(option => (
            <SelectorOption
              option={option}
              onSelect={handleSelectOption}
              key={option.id}
            />
          ))}
        </ul>
      )}
    </Container>
  )
}
