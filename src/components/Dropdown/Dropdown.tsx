import { useState } from 'react'
import clsx from 'clsx'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import type { Option } from '@/store/RepoStore/repo'
import './Dropdown.scss'

interface DropdownProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder: string
  className?: string
}

const Dropdown = ({
  options,
  value,
  placeholder,
  onChange,
  disabled,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (key: string) => {
    onChange(key)
    setIsOpen(false)
  }

  return (
    <div className={clsx('dropdown', disabled && 'disabled', className)}>
      <div
        className={clsx('dropdown__input', isOpen && 'open')}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {options.find((o) => o.key === value)?.value || placeholder}
        <ArrowDownIcon
          width={20}
          height={20}
          className="dropdown__input-icon"
        />
      </div>

      {isOpen && (
        <div className="dropdown__dropdown">
          {options.map((option) => (
            <div
              key={option.key}
              className={clsx(value === option.key && 'selected')}
              onClick={() => handleSelect(option.key)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
