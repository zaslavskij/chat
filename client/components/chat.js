import React from 'react'
import { useSelector } from 'react-redux'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'

const Chat = () => {
  const { user } = useSelector((s) => s.user)
  const channels = useSelector((s) => s.channels)
  const { selected } = channels
  return (
    <div className="font-sans antialiased h-screen flex">
      <Aside user={user} selected={selected} channels={Object.keys(channels.list)} />
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header selected={selected} />
        <MessagesList messages={channels.list[selected].messages} />
        <InputMessage selected={selected} />
      </div>
    </div>
  )
}

export default React.memo(Chat)
