import React from 'react'

import './Button.scss'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  ...props
}) => {
  const isDisabled = loading || props.disabled

  return (
    <button className={`btn ${className}`} disabled={isDisabled} {...props}>
      {children}
    </button>
  )
}

export default Button
