import React from 'react'

const Message = () => {
  return (
    <div className="flex items-start mb-4 text-sm">
      <img
        src="https://pbs.twimg.com/profile_images/875010472105222144/Pkt9zqPY_400x400.jpg"
        className="w-10 h-10 rounded mr-3"
        alt=""
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold">Steve Schoger</span>
          <span className="text-grey text-xs">11:46</span>
        </div>
        <p className="text-black leading-normal">The slack from the other side.</p>
      </div>
    </div>
  )
}

export default Message
