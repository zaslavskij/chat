/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Login from '../components/login'
import Chat from '../components/chat'
import Register from '../components/register'
import AdminPanel from '../components/admin-panel'
import NotFound from '../components/404'
import Hello from '../components/hello'

import Startup from './startup'

const isUserEmpty = (user) => Object.keys(user).length === 0 && user.constructor === Object

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.user)
  console.log('anonymousRoute', isUserEmpty(user), 'token', token)
  const func = (props) =>
    !isUserEmpty(user) && !!token ? (
      <Redirect to={{ pathname: '/chat' }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.user)
  console.log('PrivateRoute', isUserEmpty(user), 'token', token)
  const func = (props) =>
    !isUserEmpty(user) && !!token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <OnlyAnonymousRoute exact path="/" component={() => <Hello />} />
            <OnlyAnonymousRoute exact path="/login" component={() => <Login />} />
            <PrivateRoute exact path="/admin" component={() => <AdminPanel />} />
            <OnlyAnonymousRoute exact path="/register" component={() => <Register />} />
            <PrivateRoute exact path="/chat" component={() => <Chat />} />
            <Route component={() => <NotFound />} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
