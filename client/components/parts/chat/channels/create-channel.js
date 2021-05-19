import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { createChannel } from '../../../../redux/reducers/channels'

const CreateChannel = () => {
  const dispatch = useDispatch()
  const [creatingShown, toggleCreating] = useState(false)
  const [val, setVal] = useState('')
  return (
    <div className="mt-2">
      {!creatingShown && (
        <button
          className="flex w-full justify-between items-center cursor-pointer py-1 px-4 text-white bg-opacity-25"
          type="button"
          onClick={() => toggleCreating(!creatingShown)}
        >
          Create channel <FaPlus />
        </button>
      )}
      {creatingShown && (
        <div className="flex pl-4 pr-2">
          <input
            value={val}
            placeholder="Channel name"
            onChange={({ target: { value } }) => setVal(value)}
            className="flex flex-1 rounded-md p-1"
            type="text"
          />
          <div className="flex ml-1 text-white">
            <button
              onClick={() => {
                toggleCreating(!creatingShown)
                setVal('')
              }}
              type="button"
              className="flex p-1 items-center justify-around"
            >
              <FaTimes />
            </button>
            {val.length > 0 && (
              <button
                onClick={() => {
                  dispatch(createChannel(val))
                  toggleCreating(!creatingShown)
                  setVal('')
                }}
                type="button"
                className="flex p-1 items-center justify-around"
              >
                <FaPlus />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateChannel
