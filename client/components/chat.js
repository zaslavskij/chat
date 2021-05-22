import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getChannels } from '../redux/reducers/channels'
import { asideToggle } from '../redux/reducers/ui'
import { sendSystemHello } from '../redux/reducers/user'

import Aside from './parts/chat/aside'
import Header from './parts/chat/header'
import InputMessage from './parts/chat/input-message'
import MessagesList from './parts/chat/messages-list'
import ManageChannel from './parts/chat/manage-channel'

const Chat = () => {
  const dispatch = useDispatch()

  const {
    user: {
      user: { nickname, roles },
      socketConnected
    },

    channels,

    ui: { asideShown }
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

  const { chatsFetched, dialogs, selection } = channels

  useEffect(() => {
    if (socketConnected && chatsFetched) {
      dispatch(sendSystemHello())
    }
  }, [socketConnected, chatsFetched])

  const messages =
    typeof channels[selection.channelType][selection.title] !== 'undefined' &&
    typeof channels[selection.channelType][selection.title].messages !== 'undefined'
      ? channels[selection.channelType][selection.title].messages
      : []

  const isChannel = selection.channelType === 'channels'

  return (
    <div className="font-sans antialiased h-screen flex">
      {asideShown && (
        <Aside
          roles={roles}
          asideToggle={asideTogglerDispatch}
          nickname={nickname}
          dialogs={dialogs}
          selection={selection}
          channels={Object.keys(channels.channels)}
        />
      )}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header asideToggle={asideTogglerDispatch} title={selection.title} isChannel={isChannel} />
        <MessagesList messages={messages} />
        <InputMessage isChannel={isChannel} channelTitle={selection.title} />
      </div>
      {false && <ManageChannel />}
    </div>
  )
}

export default React.memo(Chat)
