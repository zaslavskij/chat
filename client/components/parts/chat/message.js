import React from 'react'
import ReactMarkdown from 'react-markdown'

const Message = ({ timestamp, nickname, message }) => {
  return (
    <div className="flex items-start mb-4 text-sm">
      <img src="http://placehold.it/300" className="w-10 h-10 rounded mr-3" alt="" />
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col">
          <span className="font-bold">{nickname}</span>
          <span className="text-grey text-xs text-gray-600">{timestamp}</span>
        </div>
        <span className="text-black leading-normal">
          <ReactMarkdown>{message}</ReactMarkdown>
        </span>
      </div>
    </div>
  )
}

export default Message
