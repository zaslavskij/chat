import { debounce } from 'lodash'
import React, { useEffect, useMemo, useCallback } from 'react'
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

  const asideTogglerDispatch = useCallback((...ars) => {
    return dispatch(asideToggle(...ars))
  }, [])

  const asideTogglerWindow = useCallback(
    debounce(() => {
      if (window.innerWidth > 640) asideTogglerDispatch(true)
      else asideTogglerDispatch(false)
    }, 200),
    []
  )

  useEffect(() => {
    asideTogglerWindow()
    window.addEventListener('resize', asideTogglerWindow)
    dispatch(getChannels())
    return () => {
      window.removeEventListener('resize', asideTogglerWindow)
    }
  }, [])

  const { chatsFetched, dialogs, selection } = channels

  const asideChannels = useMemo(() => Object.keys(channels.channels), [
    Object.keys(channels.channels).length
  ])

  const asideDialogs = useMemo(() => dialogs, [Object.keys(dialogs).length])

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
      {asideShown && Object.keys(channels).length > 0 && Object.keys(dialogs).length > 0 && (
        <Aside
          roles={roles}
          asideToggle={asideTogglerDispatch}
          nickname={nickname}
          dialogs={asideDialogs}
          selection={selection}
          asideTogglerWindow={asideTogglerWindow}
          asideChannels={asideChannels}
        />
      )}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <Header
          roles={roles}
          asideToggle={asideTogglerDispatch}
          title={selection.title}
          isChannel={isChannel}
        />
        <MessagesList messages={messages} />
        <InputMessage isChannel={isChannel} channelTitle={selection.title} />
      </div>
      {false && <ManageChannel />}
    </div>
  )
}

export default React.memo(Chat)
