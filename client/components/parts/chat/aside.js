import React from 'react'
import { FaTimes } from 'react-icons/fa'

import ChannelsList from './channels-list'
import ProfileBlock from './profile-block'

const Aside = ({ user, channels, selected }) => {
  return (
    <div className="bg-green-600 text-purple-lighter flex-none w-64 pb-6 select-none block sm:fixed sm:top-0 sm:left-0 sm:h-screen">
      <div className="text-white mb-2 mt-3 px-4 sm:px-2 flex justify-between">
        <div className="flex-auto">
          <div className="flex items-center leading-tight mb-1 truncate">
            <FaTimes className="sm:flex hidden mr-2" />
            <span className="font-semibold text-xl">Messenger</span>
          </div>
          <ProfileBlock username={user.nickname || user.email} />
        </div>
      </div>
      <ChannelsList channels={channels} selected={selected} />
    </div>
  )
}

Aside.propTypes = {}

export default Aside
