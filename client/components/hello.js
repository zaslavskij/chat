import React from 'react'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Hello = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center p-2 pt-6 pb-10 w-full  max-w-xl border shadow">
        <h1 className="pb-4 text-2xl text-gray-600">
          Wellcome to <b>Messanger</b>
        </h1>
        <strong className="font-medium flex text-gray-600 pb-8 pt-2">
          Ultimate communication tool that allows you messaging!
        </strong>
        <div className="flex">
          <Link
            className="flex items-center bg-blue-500 mr-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/login"
          >
            <FaSignInAlt className="mr-2" />
            SIGN IN
          </Link>
          <Link
            className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            to="/register"
          >
            <FaUserPlus className="mr-2" />
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hello
