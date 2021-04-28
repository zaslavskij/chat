import React from 'react'
import { useDispatch } from 'react-redux'
import { selectChannel } from '../../../redux/reducers/channels'
import Channel from './channel'

const ChannelsList = ({ channels, selected }) => {
  const dispatch = useDispatch()

  return (
    <div className="mb-8">
      <div className="px-4 text-white flex justify-between items-center">
        <div className="opacity-75">Chats</div>
        <div>
          <svg
            className="fill-current h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
        </div>
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
      </div>
    </div>
  )
}

export default ChannelsList
