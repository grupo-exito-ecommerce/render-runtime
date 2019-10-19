import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  useRef,
  ComponentType,
  FunctionComponent,
  useEffect,
} from 'react'

import Loading from './Loading'
import GenericPreview from './Preview/GenericPreview'

interface LoadingContext {
  setLoading: (treePath: string, isLoading: boolean) => void
  isParentLoading?: boolean
}
export const LoadingContext = React.createContext<LoadingContext>({
  setLoading: () => {},
  isParentLoading: false,
})

LoadingContext.displayName = 'LoadingContext'

interface LoadingState {
  components: { [key: string]: boolean }
}
export const LoadingWrapper: FunctionComponent = ({ children }) => {
  // const [areComponentsLoaded, setComponentsLoaded] = useState(false)

  const state = useRef<LoadingState>({ components: {} })

  const { isParentLoading } = useContext(LoadingContext)

  const childrenContainer = useRef<HTMLDivElement>(null)
  const loadingContainer = useRef<HTMLDivElement>(null)

  const loadingTimeout = useRef<NodeJS.Timer | null>(null)
  const loadingComplete = useRef(false)

  const updateLoading = useCallback(() => {
    const areComponentsLoaded = Object.values(state.current.components).some(
      Boolean
    )

    const isLoading = isParentLoading || areComponentsLoaded

    if (!isLoading) {
      loadingTimeout.current = setTimeout(() => {
        if (childrenContainer.current) {
          // childrenContainer.current.style.display = ''
          childrenContainer.current.style.position = ''
          childrenContainer.current.style.width = ''
          childrenContainer.current.style.opacity = ''
        }
        if (loadingContainer.current) {
          loadingContainer.current.style.display = 'none'
        }

        loadingComplete.current = true
      }, 500)
    } else {
      if (!loadingComplete.current && loadingTimeout.current !== null) {
        clearTimeout(loadingTimeout.current)
        loadingTimeout.current = null
      }

      if (isParentLoading && loadingComplete.current) {
        loadingComplete.current = false
        if (childrenContainer.current) {
          childrenContainer.current.style.position = 'absolute'
          childrenContainer.current.style.width = '100%'
          childrenContainer.current.style.opacity = '0'
        }
        if (loadingContainer.current) {
          loadingContainer.current.style.display = ''
        }
      }
    }
  }, [isParentLoading])

  const setLoading = useCallback(
    (treePath, loading) => {
      if (loadingComplete.current) {
        return
      }

      state.current.components[treePath] = loading

      updateLoading()
      // if (loaded !== areComponentsLoaded) {
      //   setComponentsLoaded(loaded)
      // }
    },
    [updateLoading]
  )

  useEffect(() => {
    updateLoading()
  }, [isParentLoading, updateLoading])

  const value = useMemo(
    () => ({
      setLoading,
    }),
    [setLoading]
  )

  // const isLoading = isParentLoading || areComponentsLoaded

  // console.log({ isLoading, isParentLoading, areComponentsLoaded })

  // useLayoutEffect(() => {
  //   console.log('layut effect')
  // if (!isLoading) {
  //   loadingTimeout.current = setTimeout(() => {
  //     if (childrenContainer.current) {
  //       childrenContainer.current.style.display = ''
  //     }
  //     if (loadingContainer.current) {
  //       loadingContainer.current.style.display = 'none'
  //     }

  //     loadingComplete.current = true
  //   }, 500)
  // } else {
  //   if (!loadingComplete.current && loadingTimeout.current !== null) {
  //     clearTimeout(loadingTimeout.current)
  //     loadingTimeout.current = null
  //   }
  // }
  // }, [isLoading, state])

  const isSSR = !window.navigator

  const returnValue = useMemo(
    () => (
      <LoadingContext.Provider value={value}>
        <div
          ref={childrenContainer}
          // style={{ display: isSSR ? 'unset' : 'none' }}
          style={{
            opacity: isSSR ? '1' : '0',
            position: isSSR ? 'unset' : 'absolute',
            width: isSSR ? 'unset' : '100%',
          }}
        >
          {children}
        </div>
        <div
          ref={loadingContainer}
          suppressHydrationWarning
          style={{ display: isSSR ? 'none' : 'unset' }}
        >
          <GenericPreview />
        </div>
      </LoadingContext.Provider>
    ),
    [children, isSSR, value]
  )

  return returnValue
}

export const withLoading = <T extends {}>(Component: ComponentType<T>) => {
  const EnhancedComponent: FunctionComponent<T> = props => {
    const isSSR = !window.navigator

    if (isSSR) {
      return <Component {...props} setLoading={() => {}} />
    }

    return (
      <LoadingContext.Consumer>
        {({ setLoading }) => <Component {...props} setLoading={setLoading} />}
      </LoadingContext.Consumer>
    )
  }

  EnhancedComponent.displayName = `WithLoading(${Component.displayName ||
    Component.name ||
    'Component'})`

  return EnhancedComponent
}
