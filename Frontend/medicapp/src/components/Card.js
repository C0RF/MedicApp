import React from "react"

const Card = (props) => {

  const {description} = props
//   const { classname, description} = props

  return (
    <div className="card">
      {description}
    </div>
  )
}

export default Card
