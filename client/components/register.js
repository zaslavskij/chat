import React from 'react'
import Form from './parts/form/form'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-medium text-gray-500 text-center pb-4">REGISTER</h2>
        <Form parent="register" />
      </div>
    </div>
  )
}

export default React.memo(Register)
