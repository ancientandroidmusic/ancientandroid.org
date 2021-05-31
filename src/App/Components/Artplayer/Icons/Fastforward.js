import React from 'react'

const Fastforward = ({onPlayerClick}) => {
  return (
      <svg className="playpauseButton" viewBox="0 0 100 60">
        <polygon points="0,0 50,30 0,60" fill="#ccc" />
        <polygon points="50,0 100,30 50,60" fill="#ccc" />
      </svg>
  )
}

export default Fastforward
