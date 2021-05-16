import React from 'react'
import Button from './parts/buttons'

const Hello = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center p-2 pt-6 pb-10 w-full max-w-xl border shadow sm:shadow-none sm:border-none sm:px-4">
        <h1 className="pb-4 text-2xl text-gray-600">
          Wellcome to <b>Messanger</b>
        </h1>
        <strong className="font-medium flex text-gray-600 pb-8 pt-2">
          Ultimate communication tool that allows you messaging!
        </strong>

        <div className="flex">
          <Button type="link" cb="/login" iconTitle="FaSignInAlt" color="green" title="SIGN IN" />
          <Button type="link" cb="/register" iconTitle="FaUserPlus" color="blue" title="SIGN UP" />
        </div>
      </div>
    </div>
  )
}

export default Hello
