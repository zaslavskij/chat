import React, { useState } from 'react'
import ProfileDropdown from './profile-dropdown'

const ProfileBlock = ({ username }) => {
  const [shown, toggleShown] = useState(false)
  return (
    <div
      role="button"
      className="flex items-center pb-6 relative"
      onClick={() => toggleShown(!shown)}
      tabIndex={0}
      onKeyDown={() => toggleShown(!shown)}
    >
      <div className="flex flex-row items-center">
        <span className="bg-white rounded-full block w-2 h-2 mr-2"> </span>
        <span className="text-white opacity-50 text-sm">{username}</span>
      </div>
      {shown && <ProfileDropdown />}
    </div>
  )
}

export default ProfileBlock
