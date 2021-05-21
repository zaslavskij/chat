import React from 'react'

const DialogButton = ({ online, title, selected, cb }) => {
  return (
    <button
      type="button"
      onClick={() => cb('dialogs', title)}
      className={`px-4 w-full flex items-center ${
        online ? 'opacity-100 text-medium' : 'opacity-75'
      } ${selected ? 'bg-gray-800' : ' '} text-white bg-opacity-25`}
      key={title}
    >
      {online && <span className="bg-white rounded-full block w-2 h-2 mr-1 mt-1" />}
      {title}
    </button>
  )
}

export default DialogButton
