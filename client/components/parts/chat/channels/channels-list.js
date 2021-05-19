import React from 'react'
import { useDispatch } from 'react-redux'

import Channel from './channel'
import CreateChannel from './create-channel'

const ChannelsList = ({ channels, selected, roles, setSelected }) => {
  const dispatch = useDispatch()
  return (
    <div className="mb-8">
      <div className="px-4 text-white flex justify-between items-center">
        <span className="flex items-center">
          <span className="flex mr-1">#</span> Channels
        </span>
      </div>
      <div className="flex flex-col items-stretch h-full">
        {channels.length &&
          channels.map((c) => (
            <Channel
              key={c}
              title={c}
              selected={selected}
              cb={(ch) => dispatch(setSelected('channels', ch))}
            />
          ))}
        {roles.some((r) => r === 'admin') && <CreateChannel />}
      </div>
    </div>
  )
}

export default ChannelsList
