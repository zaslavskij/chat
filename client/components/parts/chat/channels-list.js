import React from 'react'
import { useDispatch } from 'react-redux'

import { selectChannel } from '../../../redux/reducers/channels'
import Channel from './channel'
import CreateChannel from './create-channel'

const ChannelsList = ({ channels, selected }) => {
  const dispatch = useDispatch()

  return (
    <div className="mb-8">
      <div className="px-4 text-white flex justify-between items-center">
        <div className="opacity-75">Chats</div>
      </div>
      <div className="flex flex-col items-stretch">
        {channels.length &&
          channels.map((c) => (
            <Channel
              key={c}
              title={c}
              selected={selected}
              cb={(ch) => dispatch(selectChannel(ch))}
            />
          ))}
        <CreateChannel />
      </div>
    </div>
  )
}

export default ChannelsList
