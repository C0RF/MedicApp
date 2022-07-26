import React, { useState, useEffect } from "react"
//import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

import "./StepProgress.css"

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-US'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const StepProgress = (props) => {

  const { steps, contentStepsHandler, placeholder } = props;
  const [contentSteps, setContentSteps] = useState(['', '', '', '']);
  const [isListening, setIsListening] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(null)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({type: "", message: ""});

  useEffect(() => {
    handleListen()
    // eslint-disable-next-line
  }, [isListening])

  useEffect(() => {
    contentStepsHandler(contentSteps)
  }, [contentSteps])

  useEffect(() => {
    if(alertConfig.type && alertConfig.message){
      setOpenAlert(true)
    }
      
  }, [alertConfig]);

  const handleClose = (event, reason) => {
    setOpenAlert(false)
  }

  const handleListen = () => {
    try{
      if (isListening) {
        mic.start()
        setTimeout(() => {
          if(isListening){
            setIsListening(false);
          }
        }, 2500);
  
        mic.onend = () => {
          console.log('continuar..')
          mic.start()
        }
  
  
      } else {
        mic.stop()
        mic.onend = () => {
          console.log('Microfono detenido')
        }
      }
      mic.onstart = () => {
        console.log('Microfono encendido')
      }
  
      mic.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        //console.log(transcript)
        let sistomasCopy = [...contentSteps]
        sistomasCopy[currentIdx] = transcript.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
        setContentSteps(sistomasCopy)
        mic.onerror = event => {
          console.log(event.error)
        }
      }
    }catch(e){
      setAlertConfig({type: "error", message: 'Ocurrió un error con el micrófono'});
      console.log("error detectado: ", e)
    }
  }
  const handleChange = (event, idx) => {
    let sistomasCopy = [...contentSteps]
    sistomasCopy[idx] = event.target.value
    setContentSteps(sistomasCopy);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //props.history.push(`/search/name/${name}`);
  };

  return (
    <div className="StepProgress-container">
        <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert severity={alertConfig.type} sx={{ width: "100%" }}>
              {alertConfig.message}
            </Alert>
        </Snackbar>
        {
            steps.map((step, idx) => (
                    <div key={idx} className="StepProgress-item">
                        <div className="left-item-container">
                            <div className="speech-item-container">
                              <IconButton
                                onClick={() => {
                                  setIsListening(prevState => !prevState)
                                  setCurrentIdx(idx)
                                }}
                                edge="end"
                                className="primary"
                                >
                                {(
                                  isListening && 
                                  currentIdx !== null && 
                                  currentIdx === idx) ? 
                                  <MicIcon sx={{color: "white",}} /> :  
                                  <MicNoneIcon sx={{ color: "white",}} />
                                }
                              </IconButton>
                            </div>
                            <div className="thread-step"/>
                        </div>
                        <div className="right-item-container">
                          <strong>{step}</strong>
                          <input 
                            type="text" 
                            placeholder={`Ingrese el ${String(step).toLowerCase()}`} 
                            value={contentSteps[idx]}
                            onChange={(e) => handleChange(e, idx)}
                          />
                        </div>
                    </div>
            ))
        }
    </div>
    
  )
}

export default StepProgress
