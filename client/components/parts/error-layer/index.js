import React from 'react'

const ErrorLayer = ({ errorText }) => {
  return (
    <div className="w-screen h-screen z-10 fixed top-0 left-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg">
      <div className="bg-orange-200 py-1 px-2 rounded border border-orange-300 text-orange-500">
        {errorText}
      </div>
    </div>
  )
}

export default ErrorLayer
