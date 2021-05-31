import React, { useEffect } from 'react'

import ChannelButton from './channel-button'
import CreateChannel from './create-channel'

const ChannelsList = ({ selectionDispatch, roles, channels, selection }) => {
  useEffect(() => {
    // console.log('ChannelsList mounted')
  })
  return (
    <div className="mb-8">
      <div className="px-4 text-white flex justify-between items-center">
        <span className="flex items-center mb-1">
          <span className="flex mr-1">#</span> Channels
        </span>
      </div>
      <div className="flex flex-col items-stretch h-full">
        {channels.length > 0 &&
          channels.map((c) => {
            return (
              <ChannelButton
                cb={selectionDispatch}
                key={c}
                title={c}
                selected={selection.channelType === 'channels' && selection.title === c}
              />
            )
          })}
        {roles.includes('admin') && <CreateChannel />}
      </div>
    </div>
  )
}

export default ChannelsList
