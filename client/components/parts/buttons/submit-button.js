import React from 'react'
import { useDispatch } from 'react-redux'

const SubmitButton = ({ title, cb }) => {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      onClick={() => dispatch(cb())}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {title}
    </button>
  )
}

export default React.memo(SubmitButton)
