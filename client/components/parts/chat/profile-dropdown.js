import React from 'react'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { killSession } from '../../../redux/reducers/user'

const ProfileDropdown = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  return (
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <button
        type="submit"
        className="block w-full text-left px-4 text-white opacity-50 hover:opacity-75 text-sm leading-5 focus:outline-none "
        role="menuitem"
        onClick={() => {
          cookie.remove('token')
          dispatch(killSession())
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default ProfileDropdown
