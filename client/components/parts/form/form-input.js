import React from 'react'

const InputForm = ({ formik, field }) => {
  return (
    <div className="mb-4">
      <label htmlFor={field} className="block text-gray-600 text-sm font-bold mb-2">
        {`${field.slice(0, 1).toUpperCase()}${field.slice(1, field.length).toUpperCase()}`}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        type={`${field === 'password' ? field : 'text'}`}
        name={field}
        value={formik.values[field]}
        onChange={formik.handleChange}
      />
      {formik.errors[field] && formik.touched[field] && (
        <span className="text-xs text-red-400 text-italic">{formik.errors[field]}</span>
      )}
    </div>
  )
}

export default InputForm
