import React from 'react'
import SubmitButton from './parts/buttons/submit-button'
import Header from './parts/admin/header'
import User from './parts/admin/user'

const AdminPanel = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex w-full flex-col mx-auto max-w-5xl">
        <div className="flex justify-between flex-row align-middle p-3 rounded-lg mx-4 mb-4 bg-gray-100 font-mono text-md text-blue-700 whitespace-pre">
          <User username="Jozeph Huevson" />
          <div className="flex items-center flex-row">
            <SubmitButton title="Drop" cb={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
