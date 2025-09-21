import * as React from 'react'

import './Text.scss'

export type TextProps = {
  className?: string
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span'
  weight?: 'normal' | 'medium' | 'bold'
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'accent'
  maxLines?: number
}

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
  ...props
}) => {
  const Component = tag

  const classList = []
  if (className) {
    classList.push(className)
  }
  if (view) {
    classList.push(`text_view_${view}`)
  }
  if (weight) {
    classList.push(`text_weight_${weight}`)
  }
  if (color) {
    classList.push(`text_color_${color}`)
  }
  if (maxLines) {
    classList.push('text_ellipsis')
  }

  const classes = classList.join(' ')

  const style = maxLines
    ? ({
        '--max-lines': maxLines,
        WebkitLineClamp: maxLines,
      } as React.CSSProperties)
    : {}

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  )
}

export default Text
