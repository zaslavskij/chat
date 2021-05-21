import React from 'react'
import { FaBars } from 'react-icons/fa'

const Header = ({ title, asideToggle, isChannel }) => {
  return (
    <div className="border-b px-3 h-12 items-center flex">
      <button className="sm:flex hidden mr-2" type="button" onClick={() => asideToggle(true)}>
        <FaBars className="mr-2 text-gray-500 hover:text-gray-600 text-xl hidden sm:flex" />
      </button>

      <h3 className="text-gray-700 mb-1 font-extrabold">
        {isChannel ? '#' : ''}
        {title}
      </h3>
    </div>
  )
}

export default Header
