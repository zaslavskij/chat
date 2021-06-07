import React from 'react'
import { useDispatch } from 'react-redux'
import { FaBars } from 'react-icons/fa'

import { clearChannelHistory } from '../../../redux/reducers/channels'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require('react-redux/lib'), 'useSelector']]
  })
}

const Header = ({ title, asideToggle, isChannel, roles }) => {
  const dispatch = useDispatch()
  return (
    <div className="border-b px-3 h-12 items-center flex justify-between">
      <div className="flex">
        <button className="sm:flex hidden mr-2" type="button" onClick={() => asideToggle(true)}>
          <FaBars className="mr-2 text-gray-500 hover:text-gray-600 text-xl hidden sm:flex" />
        </button>
        <h3 className="text-gray-700 mb-1 font-extrabold">
          {isChannel ? '#' : '@'}
          {title}
        </h3>
      </div>

      {roles.some((r) => r === 'admin') && (
        <button
          type="button"
          className="flex px-2 border rounded border-gray-500 text-gray-600"
          onClick={() => dispatch(clearChannelHistory())}
        >
          clear messages
        </button>
      )}
    </div>
  )
}

export default Header
