import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { FaImage } from 'react-icons/fa'

import { showError } from '../../../redux/reducers/errors'
import { sendPicture } from '../../../redux/reducers/channels'

const AttachImage = () => {
  const input = useRef(null)
  const dispatch = useDispatch()
  const handleChange = () => {
    if (input.current.files[0].size > 1000000) {
      dispatch(showError('Filesize too big! it will be under 1mb'))
    } else {
      dispatch(sendPicture(input.current.files[0]))
    }
  }
  return (
    <div className="py-2 overflow-hidden px-4 sm:py-1 sm:px-2 text-center items-center text-blue-400 hover:text-blue-500 text-3xl cursor-pointer relative">
      <FaImage />
      <input
        ref={input}
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        type="file"
        name="myFile"
        onChange={handleChange}
        accept=".jpg, .jpeg, .png"
      />
    </div>
  )
}

export default AttachImage
