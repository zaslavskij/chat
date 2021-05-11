import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { tryLogin } from '../redux/reducers/user'

const Startup = (props) => {
  const token = useSelector((s) => s.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(tryLogin())
    }
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
