import React, { useRef, useEffect } from 'react'
import Message from './message'
import NoMessagesThumb from './no-messages-thumb'

const MessagesList = ({ messages }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="px-6 pt-4 flex-1 overflow-y-scroll">
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
      <div ref={messagesEndRef}> </div>
      {messages.length === 0 && <NoMessagesThumb />}
    </div>
  )
}

export default MessagesList
