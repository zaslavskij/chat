import React from 'react'
import { useDispatch } from 'react-redux'

const InputForm = ({ inputObj: { type, placeholder, inputType, cb } }) => {
  const dispatch = useDispatch()
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={type}>
        {type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
        id={placeholder}
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => {
          const {
            target: { value }
          } = e
          dispatch(cb(value))
        }}
      />
    </div>
  )
}

export default InputForm
