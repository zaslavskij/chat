import React from 'react'
import { useDispatch } from 'react-redux'
import { hideError } from '../../../redux/reducers/errors'

const ErrorLayer = ({ errorText }) => {
  const dispatch = useDispatch()
  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        console.log(e)
      }}
      onClick={() => dispatch(hideError())}
      className="w-screen h-screen z-10 cursor-default fixed top-0 left-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg"
    >
      <div className="bg-orange-200 py-1 px-2 rounded border border-orange-300 text-orange-500">
        {errorText}
      </div>
    </div>
  )
}

export default ErrorLayer
