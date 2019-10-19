import React from 'react'
import styles from './LoadingBar.css'

const LoadingBar = () => (
  <div
    className={`${styles.loadingBarAnimation} bg-action-primary`}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      zIndex: '99999999',
    }}
  />
)

export default LoadingBar
