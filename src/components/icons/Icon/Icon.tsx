import * as React from 'react'
import './Icon.css'

export type IconProps = React.SVGAttributes<SVGElement> & {
  width?: number
  height?: number
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width,
  height,
  ...props
}) => {
  color = color ?? 'primary'
  width = width ?? 24
  height = height ?? 24

  if (className && (className as string).includes('check-icon')) {
    return (
      <svg
        {...props}
        className={`${className} icon-color-${color}`}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 11.6129L9.87755 18L20 7" stroke-width="2" />
      </svg>
    )
  }
  return (
    <svg
      {...props}
      className={`${className} icon-color-${color}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  )
}

export default Icon
