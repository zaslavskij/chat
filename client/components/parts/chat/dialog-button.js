import React from 'react'

const DialogButton = ({ online, title, cb }) => {
  return (
    <button
      type="button"
      onClick={() => cb('dialog', title)}
      className={`px-4 flex items-center ${
        online ? 'opacity-100 text-medium' : 'opacity-75'
      }  text-white`}
      key={title}
    >
      {online && <span className="bg-white rounded-full block w-2 h-2 mr-1 mt-1" />}
      {title}
    </button>
  )
}

export default DialogButton
