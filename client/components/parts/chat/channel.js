import React from 'react'

const Channel = ({ title, selected, cb }) => {
  return (
    <button
      type="button"
      onClick={() => {
        console.log(title)
        return cb(title)
      }}
      className={`${
        selected === title ? 'bg-gray-800' : ' '
      } text-left cursor-pointer py-1 px-4 text-white bg-opacity-25`}
    >
      # {title}
    </button>
  )
}

export default Channel
