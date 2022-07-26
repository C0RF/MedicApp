import React from "react"

import "./DetailedTable.css"

const DetailedTable = (props) => {

  const { items, toSpeaker } = props

  return (
    <>
        {
            items.map((item, idx) => (
                
                <section 
                    key={idx} 
                    className="accordion" 
                >
                    <input type="radio" name="collapse" id={`handle${idx}`} />
                    <h2 
                        className="handle" 
                        onClick={() => toSpeaker(`${item.title}. ${item.description}`)}
                    >
                        <label htmlFor={`handle${idx}`}>{item.title}</label>
                    </h2>
                    <div className="content">
                        {item.description}
                    </div>
                </section>
            ))
        }
    </>
  )
}

export default DetailedTable
