import React from 'react'
import Message from './message'
import NoMessagesThumb from './no-messages-thumb'

const MessagesList = ({ messages }) => {
  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      {messages.length > 0 &&
        messages.map(({ timestamp, nickname, message, date, time }) => {
          return (
            <Message
              key={timestamp}
              date={date}
              time={time}
              nickname={nickname}
              message={message}
            />
          )
        })}
      {messages.length === 0 && <NoMessagesThumb />}
    </div>
  )
}

export default MessagesList
