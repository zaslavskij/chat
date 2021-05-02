import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaPaperPlane, FaBackspace } from 'react-icons'

import { sendMessage } from '../../../redux/reducers/channels'

const InputMessage = ({ selected }) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  return (
    <div className="pb-6 px-4 flex-none">
      <div className="flex rounded-lg border-2 border-grey overflow-hidden">
        <input
          type="text"
          className="w-full px-4 py-2"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          placeholder={`Message to: #${selected}`}
        />
        {message.length > 0 && (
          <div className="flex">
            <button
              className="py-2 px-2 text-center items-center text-blue-400 hover:text-blue-500 mr-2 text-3xl"
              type="button"
              onClick={() => setMessage('')}
            >
              <FaBackspace />
            </button>
            <button
              className="text-white py-2 px-4 text-center items-center bg-green-400 hover:bg-green-500 text-xl"
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
