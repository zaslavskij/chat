import React from 'react'

const DialogsList = ({ dialogs }) => {
  return (
    <div className="py-8 mx-2  border-t border-white border-opacity-50">
      <div className="text-white flex justify-between items-center">
        <span className="flex items-center ml-4">Users:</span>
      </div>
      {Object.keys(dialogs).map((title) => (
        <div
          className={`px-4 flex items-center ${
            dialogs[title].online ? 'opacity-100 text-medium' : 'opacity-75'
          }  text-white`}
          key={title}
        >
          {dialogs[title].online && (
            <span className="bg-white rounded-full block w-2 h-2 mr-1 mt-1" />
          )}
          {title}
        </div>
      ))}
    </div>
  )
}

export default DialogsList
