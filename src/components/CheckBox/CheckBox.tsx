import React from 'react'
import './CheckBox.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (checked: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  const { id = 'checkbox', ...restProps } = props

  return (
    <div className={`checkbox-wrapper ${className || ''}`}>
      <input
        type="checkbox"
        id={id}
        className="checkbox-input"
        onChange={handleChange}
        {...restProps}
      />
      <label htmlFor={id} className="checkbox-label">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66663 19.3548L16.4625 30L33.3333 11.6667"
            stroke="currentColor"
            strokeWidth="3.3333"
          />
        </svg>
      </label>
    </div>
  )
}

export default CheckBox
