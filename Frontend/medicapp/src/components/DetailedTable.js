import React from "react"

import "./DetailedTable.css"

const DetailedTable = (props) => {

  const { items } = props

  return (
    <>
        {
            items.map((item, idx) => (
                <section key={idx} className="accordion">
                    <input type="radio" name="collapse" id={`handle${idx}`} />
                    <h2 className="handle">
                        <label htmlFor={`handle${idx}`}>{item.title}</label>
                    </h2>
                    <div className="content">
                        <p>{item.description}</p>
                    </div>
                </section>
            ))
        }
    </>
  )
}

export default DetailedTable
