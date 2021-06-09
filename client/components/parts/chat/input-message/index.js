import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import InputControls from './input-controls'

import { sendMessage } from '../../../../redux/reducers/channels'

const InputMessage = ({ channelTitle, isChannel }) => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="pb-6 px-4 border-t pt-4 border-gray-200 flex-none">
      <div className="flex rounded-lg border-2 border-grey items-center overflow-hidden">
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          onHeightChange={(height, obj) => {
            if (message.length === 0) {
              // eslint-disable-next-line
              obj.rowHeight = 1
            }
          }}
          className="w-full px-4 pt-2 pb-1 resize-none"
          value={message}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
              dispatch(sendMessage(message.replace(/\n/gm, '  \n')))
              setMessage('')
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          placeholder={`Message to: ${isChannel ? '#' : '@'}${channelTitle}`}
        />
        <InputControls
          message={message}
          setMessage={setMessage}
          sendDispMessage={(...args) => dispatch(sendMessage(...args))}
        />
      </div>
    </div>
  )
}

export default InputMessage
