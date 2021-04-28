import React from 'react'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { killSession } from '../../../redux/reducers/user'

const ProfileDropdown = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  return (
    <div className="origin-bottom-right absolute right-0 top-0 mt-8 w-56 rounded-md shadow-lg">
      <div className="rounded-md bg-white shadow-xs">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <button
            type="submit"
            className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            role="menuitem"
            onClick={() => {
              cookie.remove('token')
              dispatch(killSession())
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
