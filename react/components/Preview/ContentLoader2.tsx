import React from 'react'
import styles from './ContentLoader2.css'

const PRIMARY_COLOR = '#fafafa'
const SECONDARY_COLOR = '#efefef'

interface Props {
  x: number
  y: number
  width: number
  height: number
  preserveAspectRatio?: string
}

const ContentLoader2 = ({ x = 0, y = 0, width, height }: Props) => (
  <div
    style={{
      width,
      height,
      overflow: 'hidden',
      position: 'absolute',
      top: y,
      left: x,
      borderRadius: 5,
    }}
  >
    <div
      className={styles.slide}
      style={{
        width: '400%',
        height: '100%',
        background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR})`,
      }}
    />
  </div>
)

const ContentLoaderWrapper = ({ width, height, children }) => (
  <div style={{ width, height, position: 'relative' }}>{children}</div>
)

export default ContentLoader2
export { ContentLoaderWrapper }
