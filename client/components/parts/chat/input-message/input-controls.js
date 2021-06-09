import React from 'react'
import { FaPaperPlane, FaBackspace } from 'react-icons/fa'
import AttachImage from './attach-image'

const InputControls = ({ message, setMessage, sendDispMessage }) => {
  return (
    <>
      <AttachImage />
      {message.length > 0 && (
        <div className="flex">
          <button
            className="py-2 px-4 sm:py-1 sm:px-2 text-center items-center text-red-400 hover:text-red-500 text-3xl"
            type="button"
            onClick={() => setMessage('')}
          >
            <FaBackspace />
          </button>
          <button
            className="text-white py-2 px-4 sm:py-1 sm:px-3 text-center items-center bg-green-400 hover:bg-green-500 text-xl"
            type="button"
            onClick={() => {
              sendDispMessage(message)
              setMessage('')
            }}
          >
            <FaPaperPlane />
          </button>
        </div>
      )}
    </>
  )
}

export default InputControls
