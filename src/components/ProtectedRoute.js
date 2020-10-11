import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        props.loggedIn ? <Component {...props} path={props.path} /> : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  loggedIn: PropTypes.bool,
  path: PropTypes.string
}

export default ProtectedRoute
