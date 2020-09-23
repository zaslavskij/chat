import React from 'react'
import Message from './message'

const MessagesList = () => {
  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      <Message />
    </div>
  )
}

export default MessagesList
