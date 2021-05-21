import React from 'react'
import { FaUserMinus, FaUserPlus, FaBullhorn, FaUsers } from 'react-icons/fa'

const ManageChannel = () => {
  return (
    <div className="flex fixed top-0 right-0 flex-col border-l w-64 h-screen bg-white">
      <div className="flex mx-2 mb-4 px-2 h-12 items-center border-b text-gray-600 font-bold">
        Manage channel
      </div>
      <div className="pt-2 px-4 text-gray-500">
        <strong className="flex items-center">
          <FaBullhorn className="mr-2" />
          Subscribed:
        </strong>
        <ul className="pl-6">
          <li className="flex items-center">
            User
            <button className="flex ml-1" type="button">
              <FaUserMinus />
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-4 mb-2 mx-4 border-t" />
      <div className="pt-2 px-4 text-gray-500">
        <strong className="flex items-center">
          <FaUsers className="mr-2" />
          Not on channel:
        </strong>
        <ul className="pl-6">
          <li className="flex items-center">
            User
            <button className="flex ml-1" type="button">
              <FaUserPlus />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ManageChannel
