import React from 'react'
import DialogButton from './dialog-button'

const DialogsList = ({ selectionDispatch, dialogs }) => {
  return (
    <div className="py-8 mx-2  border-t border-white border-opacity-50">
      <div className="text-white flex justify-between items-center">
        <span className="flex items-center ml-4">Users:</span>
      </div>
      {Object.keys(dialogs).map((title) => (
        <DialogButton
          online={dialogs[title].online}
          cb={selectionDispatch}
          title={title}
          key={title}
        />
      ))}
    </div>
  )
}

export default DialogsList
