import React from 'react'

const ChannelButton = ({ title, selected, cb }) => {
  return (
    <button
      type="button"
      onClick={() => cb('channels', title)}
      className={`${
        selected ? 'bg-gray-800' : ' '
      } text-left cursor-pointer py-1 px-8 text-white bg-opacity-25`}
    >
      {title}
    </button>
  )
}

export default ChannelButton
