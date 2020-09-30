import React from 'react'
import { Link } from 'react-router-dom'

const Hello = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-row justify-center items-center p2 w-full h-full max-w-xl border">
        <Link
          className="flex bg-blue-500 mr-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/login"
        >
          LOGIN
        </Link>
        <Link
          className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/register"
        >
          REGISTER
        </Link>
      </div>
    </div>
  )
}

export default Hello
