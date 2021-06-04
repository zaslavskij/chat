import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaPaperPlane, FaBackspace } from 'react-icons/fa'

import AttachImage from './attach-image'
import { sendMessage } from '../../../redux/reducers/channels'

const InputMessage = ({ channelTitle, isChannel }) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  return (
    <div className="pb-6 px-4 border-t pt-4 border-gray-200 flex-none">
      <div className="flex rounded-lg border-2 border-grey overflow-hidden">
        <input
          type="text"
          className="w-full px-4 py-2"
          value={message}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              dispatch(sendMessage(message))
              setMessage('')
            }
          }}
          onChange={({ target: { value } }) => setMessage(value)}
          placeholder={`Message to: ${isChannel ? '#' : '@'}${channelTitle}`}
        />
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
                dispatch(sendMessage(message))
                setMessage('')
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputMessage
