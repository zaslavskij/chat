import React from 'react'
import { FaBars } from 'react-icons/fa'

const Header = ({ selected }) => {
  return (
    <div className="border-b px-3 py-2 items-center flex">
      <FaBars className="mr-2 text-gray-500 hover:text-gray-600 text-xl hidden sm:flex" />
      <h3 className="text-gray-700 mb-1 font-extrabold">#{selected}</h3>
    </div>
  )
}

export default Header
