import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getChannels } from '../redux/reducers/channels'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'

const Chat = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChannels())
  }, [])
  const { user } = useSelector((s) => s.user)
  const { selected, list } = useSelector((s) => s.channels)
  const messages = typeof list[selected] !== 'undefined' ? list[selected].messages : []

  return (
    <div className="font-sans antialiased h-screen flex">
      <Aside user={user} selected={selected} channels={Object.keys(list)} />
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header selected={selected} />
        <MessagesList messages={messages} />
        <InputMessage selected={selected} />
      </div>
    </div>
  )
}

export default React.memo(Chat)
