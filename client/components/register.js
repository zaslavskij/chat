import React from 'react'
import SubmitButton from './parts/buttons/submit-button'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-medium text-gray-500 text-center pb-4">REGISTER</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <SubmitButton cb={alert} title="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(Register)
