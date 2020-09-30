import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { validateUser, tryGetUserInfo } from '../redux/reducers/register'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.reg.token)
  useEffect(() => {
    if (token) {
      dispatch(validateUser())
      dispatch(tryGetUserInfo())
    }
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
