import React from 'react'
import * as FaIcon from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ButtonDefault = ({ title, cb, color = 'green', iconTitle = false, type = 'button' }) => {
  const dispatch = useDispatch()
  const Icon = iconTitle && FaIcon[iconTitle]

  const btnClasses = `flex font-medium items-center bg-${color}-500 mr-6 hover:bg-${color}-700 text-white py-2 px-4 rounded transition-colors duration-300 ease-in-out uppercase`
  const linkClasses = `flex mr-2`

  switch (type) {
    case 'link':
      return (
        <Link className={btnClasses} to={cb}>
          {iconTitle && <Icon className={linkClasses} />}
          {title}
        </Link>
      )

    case 'button':
      return (
        <button type="button" onClick={() => dispatch(cb())} className={btnClasses}>
          {iconTitle && <Icon className={linkClasses} />}
          {title}
        </button>
      )

    default:
      return (
        <button type="submit" className={btnClasses}>
          {iconTitle && <Icon className={linkClasses} />}
          {title}
        </button>
      )
  }
}

export default React.memo(ButtonDefault)
