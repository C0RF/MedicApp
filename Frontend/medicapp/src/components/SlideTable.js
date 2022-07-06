import React from "react"

import "./SlideTable.css"

const SlideTable = (props) => {
  const { items } = props

  return (
        <div className="slide-table">
          {
              items.map((item, idx) => (
                <div key={idx} className="slide-table-row">
                  <div className="slide-table-name">
                    <p>{item.name}</p>
                  </div>
                  <div className="slide-table-content">
                    <p>{item.content}</p>
                  </div>
                </div>
            )) 
          }
        </div>
  )
}

export default SlideTable
