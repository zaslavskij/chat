import React from 'react'
import { Link } from 'react-router-dom'
import Form from './parts/form/form'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl text-gray-600 text-center tracking-wider">LOGIN</h2>
        <Form parent="login" />
        <div className="pt-2 px-2 mx-6 border-t border-gray-300 text-gray-500">
          Not registered yet? No problem -{' '}
          <Link className="text-blue-500 hover:text-blue-600" to="/register">
            hit the link
          </Link>
          !
        </div>
      </div>
    </div>
  )
}

export default React.memo(Login)
