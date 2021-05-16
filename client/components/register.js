import React from 'react'
import { Link } from 'react-router-dom'
import Form from './parts/form/form'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl text-gray-600 text-center tracking-wider">REGISTER</h2>
        <Form parent="register" />
        <div className="pt-2 px-2 mx-6 border-t border-gray-300 text-gray-500">
          Already registered?{' '}
          <Link className="text-blue-500 hover:text-blue-600" to="/login">
            Sign in
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

export default React.memo(Register)
