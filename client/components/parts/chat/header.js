import React from 'react'

const Header = ({ selected }) => {
  return (
    <div className="border-b flex px-6 py-2 items-center flex-none">
      <div className="flex flex-col">
        <h3 className="text-grey-darkest mb-1 font-extrabold">#{selected}</h3>
        <div className="text-grey-dark text-sm truncate">
          Chit-chattin about ugly HTML and mixing of concerns.
        </div>
      </div>
    </div>
  )
}

export default Header
