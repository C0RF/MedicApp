import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

import SlideTable from './../components/SlideTable';
import StepProgress from './../components/StepProgress';
import LoadingBox from './../components/LoadingBox';
import { getDiagnosis } from './../actions/defaultActions';
import "./Diagnosis.css"

const steps = ["Síntoma 1", "Síntoma 2", "Síntoma 3", "Síntoma 4"]

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Diagnosis = (props) => {
  const [alertConfig, setAlertConfig] = useState({type: "", message: ""});
  const [openAlert, setOpenAlert] = useState(false)
  const [sintomas, setSintomas] = useState( ["", "", "", ""]);
  const [results, setResults] = useState([]);

  const dispatch = useDispatch();
  const diagnosis = useSelector((state) => state.diagnosis);
  const {diagnosisList, error, loading} = diagnosis

  useEffect(() => {
    if(diagnosisList){
      setResults(
        diagnosisList.map(item => {
          return {
            name: item[0],
            content: item[1]
          }
        }
      ))
    }
  }, [diagnosisList])

  useEffect(() => {
    if(alertConfig.type && alertConfig.message){
      setOpenAlert(true)
    }
      
  }, [alertConfig]);

  useEffect(() => {
    if(error){
      setAlertConfig({type: "error", message: error});
    }
  }, [error]);

  const handleClose = (event, reason) => {
    setOpenAlert(false)
  }

  const contentStepsHandler = (contentSteps) => {
    setSintomas(contentSteps)
  }

  
  return (
    <div className="diagnosis">
      <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
      >
        <Alert severity={alertConfig.type} sx={{ width: "100%" }}>
          {alertConfig.message}
        </Alert>
      </Snackbar>
      <div className='left-diagnosis'>
        <div className='left-diagnosis-title'>
            <p>Qué síntomas presenta?</p>
        </div>
        <div className="steps-container">
            <StepProgress steps={steps} contentStepsHandler={contentStepsHandler}/>
        </div>
        <button className="btndiagnosis" onClick={() => dispatch(getDiagnosis({sintomas}))}>
          Diagnosticar
        </button>
      </div>
      {loading ? 
        <div className='right-diagnosis'>
          <LoadingBox />
        </div>
      :
      <div className='right-diagnosis'>
      <p>RESULTADOS </p>
      <div className='slide-table-container'>
        {
          results.length > 0 ? 
            <>
              <p>
                Se encontraron {results.length}{" "} 
                enfermedades que presentan los síntomas ingresados:
              </p>
              <SlideTable items={results} />
            </> 
            :
            <p>No se encontraron enfermedades</p>
        }
      </div>
    </div>
      }
    </div>
  )
}

export default Diagnosis
