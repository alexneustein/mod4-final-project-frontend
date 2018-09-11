import React from 'react';
import { Redirect } from 'react-router-dom'

const AuthWrapper = (WrappedComponent) => {
  return class extends React.Component {
    render () {
      if (this.props.loggedIn){
        return <WrappedComponent {...this.props} />
      } else {
        return <Redirect to='/login' />
      }
    }
  }
}

export default AuthWrapper
