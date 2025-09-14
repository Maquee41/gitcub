import React from 'react'

import './Input.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string
  onChange: (value: string) => void
  afterSlot?: React.ReactNode
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClassName, value, onChange, afterSlot, ...props },
    ref
  ) => {
    const handlerCheage = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
      },
      [onChange]
    )

    return (
      <div className={`test-class ${containerClassName ?? ''}`}>
        <input
          ref={ref}
          {...props}
          onChange={handlerCheage}
          value={value}
          className={`input ${className}`}
          type="text"
        />
        {afterSlot && <div className="input__after-slot">{afterSlot}</div>}
      </div>
    )
  }
)

export default Input
