import * as React from 'react'
import '../../../styles/styles.css'
import './CheckIcon.css'
import Icon, { type IconProps } from '../Icon/Icon'

const CheckIcon: React.FC<IconProps> = (props) => {
  const width = props.width ?? 24
  const height = props.height ?? 24

  return (
    <Icon
      {...props}
      className={`${props.className} check-icon`}
      color={props.color}
      width={width}
      height={height}
    />
  )
}

export default CheckIcon
