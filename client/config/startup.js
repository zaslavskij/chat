import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ErrorLayer from '../components/parts/error-layer'
import { tryLogin } from '../redux/reducers/user'
import { hideError } from '../redux/reducers/errors'

const Startup = (props) => {
  const token = useSelector((s) => s.user.token)
  const { errorShown, errorText } = useSelector((s) => s.errors)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(tryLogin())
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (errorShown) dispatch(hideError())
    }, 4000)
  }, [errorShown])

  return (
    <>
      {props.children}
      {errorShown && <ErrorLayer errorText={errorText} />}
    </>
  )
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
