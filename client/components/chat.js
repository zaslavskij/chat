import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getChannels } from '../redux/reducers/channels'
import { asideToggle } from '../redux/reducers/ui'
import { sendSystemHello } from '../redux/reducers/user'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/messages/input-message'
import MessagesList from './parts/chat/messages/messages-list'

const Chat = () => {
  const dispatch = useDispatch()

  const {
    user: {
      user: { nickname, roles },
      socketConnected
    },

    channels: { list },

    privateChats: { privateChats },

    ui: { asideShown, selected }
  } = useSelector((s) => s)

  const asideTogglerDispatch = (...ars) => {
    return dispatch(asideToggle(...ars))
  }

  const asideTogglerWindow = debounce(() => {
    if (window.innerWidth > 640) asideTogglerDispatch(true)
    else asideTogglerDispatch(false)
  }, 200)

  useEffect(() => {
    asideTogglerWindow()
    window.addEventListener('resize', asideTogglerWindow)
    dispatch(getChannels())
    return () => {
      window.removeEventListener('resize', asideTogglerWindow)
    }
  }, [])

  useEffect(() => {
    if (socketConnected && Object.keys(list).length) {
      dispatch(sendSystemHello())
    }
  }, [socketConnected, list])

  function getMessages({ chatType, name }) {
    let messages = []
    if (chatType === 'channel')
      messages =
        typeof list[name] !== 'undefined' && list[name].messages !== 'undefined'
          ? list[name].messages
          : []
    else
      messages =
        typeof privateChats[name] !== 'undefined' && privateChats[name].messages !== 'undefined'
          ? privateChats[name].messages
          : []

    return messages
  }

  const messages = getMessages(selected)

  return (
    <div className="font-sans antialiased h-screen flex">
      {asideShown && (
        <Aside
          roles={roles}
          asideToggle={asideTogglerDispatch}
          nickname={nickname}
          privateChats={privateChats}
          selected={selected}
          channels={Object.keys(list)}
        />
      )}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header asideToggle={asideTogglerDispatch} selected={selected.name} />
        <MessagesList messages={messages} />
        <InputMessage selected={selected.name} />
      </div>
    </div>
  )
}

export default React.memo(Chat)
