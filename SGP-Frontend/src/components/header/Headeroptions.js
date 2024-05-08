import React from 'react'
import "./header.css"

function Headeroptions({ title}) {
  return (
    <div className="header__options">
      <span>{title}</span>
    </div>
  )
}

export default Headeroptions