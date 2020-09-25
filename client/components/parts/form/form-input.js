import React from 'react'

const InputForm = ({ title, type, cb, value }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={`Your ${title}`}
        onChange={cb}
        value={value}
      />
    </div>
  )
}

export default InputForm
