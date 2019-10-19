import React, { useRef } from 'react'

import Preview from './Preview'

import { useExtension } from '../hooks/extension'
import GenericPreview from './Preview/GenericPreview'
import { useTreePath } from '../core/main'

const Loading = () => {
  // const { treePath } = useTreePath()

  // const isRootTreePath = treePath.indexOf('/') === -1

  // if (isRootTreePath) {
  //   return <GenericPreview />
  // }

  // return null
  const extension = useExtension()

  if (!extension) {
    return null
  }

  const { preview } = extension

  if (!preview) {
    return null
  }

  return <Preview extension={extension} />
}

const A = React.memo(({ children }) => {
  const ref = useRef()
  const isSSR = !window.navigator

  if (isSSR) {
    return <div ref={ref}>{children}</div>
  }

  return <div dangerouslySetInnerHTML={{ __html: '' }} />
})

export default Loading
