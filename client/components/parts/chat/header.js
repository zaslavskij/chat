import React from 'react'

const Header = ({ selected }) => {
  return (
    <div className="border-b flex px-6 py-2 items-center flex-none">
      <div className="flex flex-col">
        <h3 className="text-gray-700 mb-1 font-extrabold">#{selected}</h3>
      </div>
    </div>
  )
}

export default Header
