import React from 'react'
import ReactMarkdown from 'react-markdown'
// import MessageLink from './components/link'

const Message = ({ date, time, nickname, message }) => {
  return (
    <div className="flex items-start mb-4 text-sm">
      <img src="http://placehold.it/300" className="w-12 h-12 rounded mr-3" alt="" />
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col">
          <span className="font-bold">{nickname}</span>
          <span className="text-grey text-xs text-gray-600">
            {date}&nbsp;
            {time}
          </span>
        </div>
        <ReactMarkdown
          className="text-black leading-normal"
          components={{
            // eslint-disable-next-line
            a: ({ node, ...props }) => (
              // eslint-disable-next-line
              <a
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-600 font-bold"
                {...props}
              />
            ), // eslint-disable-next-line
            img: ({ node, ...props }) => (
              // eslint-disable-next-line
              <img
                className="p-2 my-2 w-full max-w-2xl h-auto flex border rounded border-gray-200"
                {...props}
              />
            )
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Message
