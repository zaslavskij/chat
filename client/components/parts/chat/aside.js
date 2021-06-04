import React from 'react'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import { changeSelection } from '../../../redux/reducers/channels'

import ChannelsList from './channels-list'
import ProfileBlock from './profile-block'
import DialogsList from './dialogs-list'

const Aside = ({
  roles,
  nickname,
  asideChannels,
  dialogs,
  selection,
  asideToggle,
  asideTogglerWindow
}) => {
  const dispatch = useDispatch()
  const selectionDispatch = (...args) => {
    dispatch(changeSelection(...args))
    asideTogglerWindow(false)
  }

  return (
    <>
      <div className="bg-green-600 text-purple-lighter flex-none w-64 pb-6 select-none block sm:fixed sm:top-0 sm:left-0 sm:h-screen z-20">
        <div className="text-white mb-2 mt-3 px-4 sm:px-2 flex justify-between">
          <div className="flex-auto">
            <div className="flex items-center leading-tight mb-1 truncate">
              <button
                className="sm:flex hidden mr-2"
                type="button"
                onClick={() => asideToggle(false)}
              >
                <FaTimes />
              </button>

              <span className="font-semibold text-xl">Messenger</span>
            </div>
            <ProfileBlock username={nickname} />
          </div>
        </div>
        <ChannelsList
          selectionDispatch={selectionDispatch}
          roles={roles}
          channels={asideChannels}
          selection={selection}
        />
        <div className="mx-2 border-t border-white border-opacity-50" />
        <DialogsList
          selection={selection}
          selectionDispatch={selectionDispatch}
          dialogs={dialogs}
        />
      </div>
      <button
        type="button"
        onClick={() => asideToggle(false)}
        className="hidden sm:flex fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-75 text-opacity-0 z-10"
      >
        close aside
      </button>
    </>
  )
}

Aside.propTypes = {}

export default React.memo(Aside)
