import React, { useState, useEffect } from 'react'
import isMobile from 'is-mobile'
import { useDispatch } from 'react-redux'

import TextareaAutosize from 'react-textarea-autosize'

import InputControls from './input-controls'
import StatusBar from './status-bar'

import { sendMessage } from '../../../../redux/reducers/channels'

const InputMessage = ({ channelTitle, isChannel }) => {
  const [message, setMessage] = useState('')
  const [isFewСharactersLeft, toggleFewСharactersLeft] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message.length >= 350) toggleFewСharactersLeft(true)
    else toggleFewСharactersLeft(false)
  }, [message])

  return (
    <div className="px-4 border-t pt-2 pb-4 border-gray-200 flex-none">
      <StatusBar msgLength={message.length} isFewСharactersLeft={isFewСharactersLeft} />

      <div className="flex rounded-lg border-2 border-grey items-center overflow-hidden">
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          className="w-full px-4 pt-2 pb-1 resize-none"
          value={message}
          onKeyDown={async (e) => {
            if (e.keyCode === 13 && !e.shiftKey && !isMobile()) {
              e.preventDefault()
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
          sendDispMessage={() => dispatch(sendMessage(message.replace(/\n/gm, '  \n')))}
        />
      </div>
    </div>
  )
}

export default InputMessage
