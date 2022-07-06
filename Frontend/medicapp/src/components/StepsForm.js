import React from "react"

import "./StepProgress.css"

const StepProgress = (props) => {

  return (
    <div className="wrapper">
        <ul className="StepProgress">
            <li className="StepProgress-item is-done">
                <strong>Post a contest</strong>
            </li>
            <li className="StepProgress-item is-done">
                <strong>Award an entry</strong>
                Got more entries that you love? Buy more entries anytime! Just hover on your favorite entry and click the Buy button
            </li>
            <li className="StepProgress-item current">
                <strong>Post a contest</strong></li>
            <li className="StepProgress-item">
                <strong>Handover</strong>
            </li>
        </ul>
    </div>
    
  )
}

export default StepsForm
