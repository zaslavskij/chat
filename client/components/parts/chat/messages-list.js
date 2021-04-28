import React from 'react'
import Message from './message'

const MessagesList = ({ messages }) => {
  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      {messages.length &&
        messages.map(({ timestamp, nickname, message }) => {
          return (
            <Message key={timestamp} timestamp={timestamp} nickname={nickname} message={message} />
          )
        })}
    </div>
  )
}

export default MessagesList
