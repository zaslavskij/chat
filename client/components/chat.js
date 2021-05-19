import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getChannels } from '../redux/reducers/channels'
import { asideToggle } from '../redux/reducers/responsive'
import { sendSystemHello } from '../redux/reducers/user'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'

const Chat = () => {
  const dispatch = useDispatch()

  const {
    user: {
      user: { nickname },
      socketConnected
    },

    channels: { selected, channels, usersOnline },

    responsive: { asideShown }
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
    console.log(socketConnected, Object.keys(channels).length > 0)
    if (socketConnected && Object.keys(channels).length) {
      dispatch(sendSystemHello())
    }
  }, [socketConnected, channels])

  const messages = typeof channels[selected] !== 'undefined' ? channels[selected].messages : []

  return (
    <div className="font-sans antialiased h-screen flex">
      {asideShown && (
        <Aside
          asideToggle={asideTogglerDispatch}
          nickname={nickname}
          usersOnline={usersOnline}
          selected={selected}
          channels={Object.keys(channels)}
        />
      )}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header asideToggle={asideTogglerDispatch} selected={selected} />
        <MessagesList messages={messages} />
        <InputMessage selected={selected} />
      </div>
    </div>
  )
}

export default React.memo(Chat)
