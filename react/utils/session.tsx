import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { ComponentType } from 'react'

import Session from '../components/Session'

export const withSession = () => {
  return function<TOriginalProps>(
    Component: ComponentType<TOriginalProps>
  ): ComponentType<TOriginalProps> {
    class WithSession extends React.Component<TOriginalProps> {
      public static get displayName(): string {
        return `WithSession(${Component.displayName ||
          Component.name ||
          'Component'})`
      }

      public static get WrappedComponent() {
        return Component
      }

      public render() {
        return (
          <Session>
            <Component {...this.props} />
          </Session>
        )
      }
    }

    return hoistNonReactStatics<TOriginalProps, {}>(WithSession, Component)
  }
}
