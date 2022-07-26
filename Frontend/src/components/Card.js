import React from "react"

const Card = (props) => {

  const {description, onClick} = props
//   const { classname, description} = props

  return (
    <div className="card" onClick={onClick}>
      {description}
    </div>
  )
}

export default Card
