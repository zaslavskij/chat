import React from 'react'
import { FaUserAstronaut, FaSignOutAlt } from 'react-icons/fa'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { killSession } from '../../../redux/reducers/user'

const ProfileDropdown = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  return (
    <div className="pt-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <button
        className="flex items-center w-full text-left pr-4 pl-2 my-1 text-white opacity-50 hover:opacity-75 text-sm leading-5 focus:outline-none "
        type="button"
        onClick={() => {
          cookie.remove('token')
          dispatch(killSession())
        }}
      >
        <FaUserAstronaut className="mr-1" /> change avatar
      </button>
      <button
        type="button"
        className="flex items-center w-full text-left pr-4 pl-2 my-1 text-white opacity-50 hover:opacity-75 text-sm leading-5 focus:outline-none "
        role="menuitem"
        onClick={() => {
          cookie.remove('token')
          dispatch(killSession())
        }}
      >
        <FaSignOutAlt className="mr-1" />
        Sign out
      </button>
    </div>
  )
}

export default ProfileDropdown
