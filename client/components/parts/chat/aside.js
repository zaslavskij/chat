import React from 'react'
import ChannelsList from './channels-list'
import ProfileBlock from './profile-block'

const Aside = ({ user, channels, selected }) => {
  return (
    <div className="bg-green-600 text-purple-lighter flex-none w-64 pb-6 hidden md:block select-none">
      <div className="text-white mb-2 mt-3 px-4 flex justify-between">
        <div className="flex-auto">
          <h1 className="font-semibold text-xl leading-tight mb-1 truncate">Messenger</h1>
          <ProfileBlock username={user.nickname || user.email} />
        </div>
      </div>
      <ChannelsList channels={channels} selected={selected} />
    </div>
  )
}

Aside.propTypes = {}

export default Aside
