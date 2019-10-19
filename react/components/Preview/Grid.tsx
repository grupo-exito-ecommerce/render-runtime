import React from 'react'
// import ContentLoader from './ContentLoader'
import ContentLoader2, { ContentLoaderWrapper } from './ContentLoader2'

interface Props {
  width: number
  height: number
}

const Grid = ({ width, height }: Props) => {
  // TODO: make these values configurable
  const itemWidth = 250
  const itemHeight = 400
  const minSpacingX = 10
  const minSpacingY = 30
  const itemsNumX = Math.floor(width / (itemWidth + minSpacingX))
  const itemsNumY = Math.floor(height / (itemHeight + minSpacingY))
  // distributes the remaining available space between each item of the grid
  const spacingX =
    (width - itemsNumX * itemWidth) / (itemsNumX > 1 ? itemsNumX - 1 : 2)
  const spacingY =
    (height - itemsNumY * itemHeight) / (itemsNumY > 1 ? itemsNumY - 1 : 2)

  return (
    // <ContentLoader width={width} height={height}>
    <ContentLoaderWrapper width={width} height={height}>
      {Array.from({ length: itemsNumX }).map((_, x) =>
        Array.from({ length: itemsNumY }).map((__, y) => (
          <ContentLoader2
            key={`${x}-${y}`}
            x={x * (itemWidth + spacingX)}
            y={y * (itemHeight + spacingY)}
            width={itemWidth}
            height={itemHeight}
          />
          // <rect
          //   key={`${x}-${y}`}
          //   x={x * (itemWidth + spacingX)}
          //   y={y * (itemHeight + spacingY)}
          //   width={itemWidth}
          //   height={itemHeight}
          //   rx="5"
          //   ry="5"
          // />
        ))
      )}
      {/* </ContentLoader> */}
    </ContentLoaderWrapper>
  )
}

export default Grid
