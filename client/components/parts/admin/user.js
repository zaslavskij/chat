import React from 'react'

const User = ({ username }) => {
  return (
    <div className="flex items-center flex-row">
      <img className="block rounded-lg w-16 mr-4 h-auto" src="http://placehold.it/300" alt="" />
      <span>{username}</span>
    </div>
  )
}

export default User
