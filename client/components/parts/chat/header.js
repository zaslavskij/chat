import React from 'react'

const Header = () => {
  return (
    <div className="border-b flex px-6 py-2 items-center flex-none">
      <div className="flex flex-col">
        <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
        <div className="text-grey-dark text-sm truncate">
          Chit-chattin about ugly HTML and mixing of concerns.
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2"
          />
          <div className="absolute pin-y pin-l pl-3 flex items-center justify-center"> </div>
        </div>
      </div>
    </div>
  )
}

export default Header
