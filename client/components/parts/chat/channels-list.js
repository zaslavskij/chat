import React from 'react'
import { useDispatch } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import { selectChannel } from '../../../redux/reducers/channels'
import Channel from './channel'

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
        <button
          className="flex justify-between items-center cursor-pointer py-1 px-4 text-white bg-opacity-25"
          type="button"
        >
          Create channel <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default ChannelsList
