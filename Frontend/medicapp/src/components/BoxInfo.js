import React from "react"
import { Link } from "react-router-dom"

const BoxInfo = (props) => {

  const { classname, title, description, image, link } = props

  return (
    <div className={classname}>
      <img alt="" src={image}/>
      <div className={classname === "Home"? "homecuadro": "cuadro"}>
        <Link to={link}>
          <button className="btntitulo"> {title} </button>
        </Link>
        <div className="descripcion">
          {description}
        </div>
      </div>
    </div>
  )
}

export default BoxInfo
