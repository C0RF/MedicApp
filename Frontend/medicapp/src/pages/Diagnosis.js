import React, {useState} from "react"

import SlideTable from './../components/SlideTable';
import StepProgress from './../components/StepProgress';
import "./Diagnosis.css"

const data= [
  {
      name: "Enfermeda 1",
      content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
    name: "Enfermeda 1",
    content: "90%"
  },
  {
  name: "Enfermeda 1",
  content: "90%"
  },
  {
  name: "Enfermeda 1",
  content: "90%"
  },
  {
  name: "Enfermeda 1",
  content: "900%"
  },
]

const steps = ["Síntoma 1", "Síntoma 2", "Síntoma 3", "Síntoma 4"]

const Diagnosis = (props) => {
  const [active, setActive] = useState(0);
  
  return (
    <div className="diagnosis">
      <div className='left-diagnosis'>
        <div className='left-diagnosis-title'>
            <p>Qué síntomas presenta?</p>
        </div>
        <div className="steps-container">
            <StepProgress steps={steps}/>
        </div>
        <button className="btndiagnosis" onClick={() => setActive(1)}>
          Diagnosticar
        </button>
      </div>
      {active ? 
      <div className='right-diagnosis'>
        <p>ENFERMEDADES ENCONTRADAS </p>
        <div className='slide-table-container'>
          <p>Se encontraron 10 enfermedades que presentan los síntomas ingresados:</p>
          <SlideTable items={data} />
        </div>
      </div>
      :
      <div className='right-diagnosis'>
      </div>
      }
    </div>
  )
}

export default Diagnosis
