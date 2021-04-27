import React from 'react'
import { useSelector } from 'react-redux'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'

const Chat = () => {
  const { user } = useSelector((s) => s.user)
  return (
    <div className="font-sans antialiased h-screen flex">
      <Aside user={user} />
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header />
        <MessagesList />
        <InputMessage />
      </div>
    </div>
  )
}

export default React.memo(Chat)
