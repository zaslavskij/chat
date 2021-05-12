import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import ProfileDropdown from './profile-dropdown'

const ProfileBlock = ({ username }) => {
  const [shown, toggleShown] = useState(false)
  return (
    <div
      role="button"
      className="flex flex-col items-stretch w-full pb-6 relative"
      onClick={() => toggleShown(!shown)}
      tabIndex={0}
      onKeyDown={() => toggleShown(!shown)}
    >
      <div className="flex text-white items-center">
        <span className="bg-white rounded-full block w-2 h-2 mr-2" />
        <span className="opacity-50 hover:opacity-75 text-sm">{username}</span>
        <FaAngleDown className={`${shown ? 'transform rotate-180' : ''} opacity-75 text-sm ml-1`} />
      </div>
      {shown && <ProfileDropdown />}
    </div>
  )
}

export default ProfileBlock
