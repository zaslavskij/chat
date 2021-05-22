import React from 'react'
import DialogButton from './dialog-button'

const DialogsList = ({ selectionDispatch, dialogs, selection }) => {
  return (
    <div className="py-6">
      <div className="text-white flex justify-between items-center">
        <span className="flex items-center ml-4 mb-1">Users:</span>
      </div>
      {Object.keys(dialogs).map((title) => (
        <DialogButton
          online={dialogs[title].online}
          cb={selectionDispatch}
          title={title}
          key={title}
          selected={selection.channelType === 'dialogs' && selection.title === title}
        />
      ))}
    </div>
  )
}

export default DialogsList
