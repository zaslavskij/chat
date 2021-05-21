import React from 'react'

const Channel = ({ title, selected, cb }) => {
  return (
    <button
      type="button"
      onClick={() => cb('channel', title)}
      className={`${
        selected === title ? 'bg-gray-800' : ' '
      } text-left cursor-pointer py-1 px-8 text-white bg-opacity-25`}
    >
      {title}
    </button>
  )
}

export default Channel
