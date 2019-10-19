import React from 'react'
import ContentLoader2, { ContentLoaderWrapper } from './ContentLoader2'

interface Props {
  width: number
  height: number
}

const Box = ({ width, height }: Props) => (
  <ContentLoaderWrapper width={width} height={height}>
    <ContentLoader2 width={width} height={height} />
  </ContentLoaderWrapper>
)

/*  {/* <ContentLoader width={width} height={height}>
    <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
  </ContentLoader> }*/

export default Box
