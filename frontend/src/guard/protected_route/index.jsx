import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({isAuth: isAuth, component: Component, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render={
        (props) => {
          if(isAuth) return <Component />
          if(!isAuth) return <Redirect to="/" /> 
        }
      } 
    />
  )
}

export default ProtectedRoute
