import React from 'react'
import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'

const Chat = () => {
  return (
    <div className="font-sans antialiased h-screen flex">
      <Aside />
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header />
        <MessagesList />
        <InputMessage />
      </div>
    </div>
  )
}

export default React.memo(Chat)
