import React from 'react'

import './Loader.scss'

export type LoaderProps = {
  size?: 's' | 'm' | 'l'
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ className, size }) => {
  return <span className={`loader loader-${size} ${className}`}></span>
}

export default React.memo(Loader)
