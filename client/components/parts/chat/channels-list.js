import React from 'react'

import Channel from './channel'
import CreateChannel from './create-channel'

const ChannelsList = ({ selectionDispatch, roles, channels, selected }) => {
  return (
    <div className="mb-8">
      <div className="px-4 text-white flex justify-between items-center">
        <span className="flex items-center">
          <span className="flex mr-1">#</span> Channels
        </span>
      </div>
      <div className="flex flex-col items-stretch h-full">
        {channels.length > 0 &&
          channels.map((c) => (
            <Channel cb={selectionDispatch} key={c} title={c} selected={selected} />
          ))}
        {roles.includes('admin') && <CreateChannel />}
      </div>
    </div>
  )
}

export default ChannelsList
