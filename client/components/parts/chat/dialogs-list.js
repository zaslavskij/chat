import React from 'react'

const DialogsList = ({ dialogs }) => {
  return (
    <div className="py-8 mx-2  border-t border-white border-opacity-50">
      <div className="text-white flex justify-between items-center">
        <span className="flex items-center">
          <span className="bg-white rounded-full block w-2 h-2 mr-2" />
          Users:
        </span>
      </div>
      {Object.keys(dialogs).map((title) => (
        <div className="px-4 opacity-75 text-white" key={title}>
          {title}
        </div>
      ))}
    </div>
  )
}

export default DialogsList
