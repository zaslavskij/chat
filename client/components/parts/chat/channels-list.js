import React from 'react'
import { useDispatch } from 'react-redux'

import { selectChannel } from '../../../redux/reducers/channels'
import Channel from './channel'
import CreateChannel from './create-channel'

const ChannelsList = ({ roles, channels, selected }) => {
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
              cb={(ch) => dispatch(selectChannel(ch))}
            />
          ))}
        {roles.includes('admin') && <CreateChannel />}
      </div>
    </div>
  )
}

export default ChannelsList
