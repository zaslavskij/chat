import React from 'react'

const StatusBar = ({ isFewСharactersLeft, msgLength }) => {
  return (
    <div className="flex text-xs pb-1">
      {isFewСharactersLeft && <span className="text-red-300">Symbols left: {500 - msgLength}</span>}
    </div>
  )
}

export default StatusBar
