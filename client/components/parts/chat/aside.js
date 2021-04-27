import React from 'react'
import Channel from './channel'
import ProfileBlock from './profile-block'

const Aside = ({ user }) => {
  return (
    <div className="bg-green-600 text-purple-lighter flex-none w-64 pb-6 hidden md:block">
      <div className="text-white mb-2 mt-3 px-4 flex justify-between">
        <div className="flex-auto">
          <h1 className="font-semibold text-xl leading-tight mb-1 truncate">Messenger</h1>
          <ProfileBlock username={user.nickname || user.email} />
        </div>
        <div>
          <svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
            <path
              d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="mb-8">
        <div className="px-4 mb-2 text-white flex justify-between items-center">
          <div className="opacity-75">Chats</div>
          <div>
            <svg
              className="fill-current h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
            </svg>
          </div>
        </div>
        {user.chats && user.chats.map((name) => <Channel key={name} title={name} />)}
      </div>
    </div>
  )
}

Aside.propTypes = {}

export default Aside
