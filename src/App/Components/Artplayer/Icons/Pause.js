import React from 'react'

const Pause = ({onPlayerClick}) => {
  return (
    <svg className="playpauseButton" viewBox="0 0 60 60" >
        <polygon color="green" points="0,0 15,0 15,60 0,60" fill="white" />
        <polygon color="green" points="25,0 40,0 40,60 25,60" fill="white" />
    </svg>
  )
}

export default Pause
