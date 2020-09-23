import React from 'react'

const SubmitButton = ({ title, cb }) => (
  <button
    type="button"
    onClick={() => cb()}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {title}
  </button>
)

export default React.memo(SubmitButton)
