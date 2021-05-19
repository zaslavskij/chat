import React from 'react'
import { FaTimes } from 'react-icons/fa'

import { setSelected } from '../../../redux/reducers/ui'

import ChannelsList from './channels/channels-list'
import ProfileBlock from './profile-block'
import PrivateChatsList from './private_chats/private-chats-list'

const Aside = ({ nickname, channels, privateChats, selected, asideToggle, roles }) => {
  return (
    <>
      <div className="bg-green-600 text-purple-lighter flex-none w-64 pb-6 select-none block sm:fixed sm:top-0 sm:left-0 sm:h-screen z-10">
        <div className="text-white mb-2 mt-3 px-4 sm:px-2 flex justify-between">
          <div className="flex-auto">
            <div className="flex items-center leading-tight mb-1 truncate">
              <button
                className="sm:flex hidden mr-2"
                type="button"
                onClick={() => asideToggle(false)}
              >
                <FaTimes />
              </button>

              <span className="font-semibold text-xl">Messenger</span>
            </div>
            <ProfileBlock username={nickname} />
          </div>
        </div>
        <ChannelsList
          roles={roles}
          channels={channels}
          selected={selected.chatType === 'channels' ? selected.name : false}
          setSelected={setSelected}
        />
        <PrivateChatsList
          privateChats={privateChats}
          selected={selected.chatType !== 'channels' ? selected.name : false}
          setSelected={setSelected}
        />
      </div>
      <div className="hidden sm:flex fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-75" />
    </>
  )
}

Aside.propTypes = {}

export default React.memo(Aside)
