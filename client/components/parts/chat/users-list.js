import React from 'react'

const UsersList = ({ usersOnline }) => {
  return (
    <div className="py-8 mx-2  border-t border-white border-opacity-50">
      <div className="text-white flex justify-between items-center">
        <span className="flex items-center">
          <span className="bg-white rounded-full block w-2 h-2 mr-2" />
          Users:
        </span>
      </div>
      {usersOnline.map((nickname) => (
        <div className="px-4 opacity-75 text-white" key={nickname}>
          {nickname}
        </div>
      ))}
    </div>
  )
}

export default UsersList
