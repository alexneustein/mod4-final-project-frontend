import React from 'react';
import { Redirect } from 'react-router-dom'

const authWrapper = (wrappedComponent) => {
  return class extends React.Component {
    render () {
      if (this.props.loggedIn){
        return <wrappedComponent {...this.props} />
      } else {
        return <Redirect to='/login' />
      }
    }
  }
}

export default authWrapper
