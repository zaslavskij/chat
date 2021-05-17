import React from 'react'

const ErrorLayer = ({ message = 'wow, something goes wrong' }) => {
  return (
    <div className="w-screen h-screen z-10 fixed top-0 left-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="bg-orange-200 py-1 px-2 rounded border border-orange-300 text-orange-500">
        {message}
      </div>
    </div>
  )
}

export default ErrorLayer
