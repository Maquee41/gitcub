import { useState } from 'react'
import clsx from 'clsx'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import type { Option } from '@/types/repo'
import './Dropdown.scss'

type DropdownProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder: string
  className?: string
}

export function Dropdown({
  options,
  value,
  placeholder,
  onChange,
  disabled,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (key: string) => {
    onChange(key)
    setIsOpen(false)
  }

  return (
    <div className={clsx('dropdown', disabled && 'disabled', className)}>
      <div
        className="dropdown__input"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {options.find((o) => o.key === value)?.value || placeholder}
        <ArrowDownIcon
          width={24}
          hanging={24}
          className="dropdown__input-icon"
        />
      </div>

      {isOpen && (
        <div className="dropdown__dropdown">
          {options.map((option) => (
            <div
              key={option.key}
              onClick={() => handleSelect(option.key)}
              style={{
                padding: 8,
                cursor: 'pointer',
                background: value === option.key ? '#eee' : '#fff',
              }}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
