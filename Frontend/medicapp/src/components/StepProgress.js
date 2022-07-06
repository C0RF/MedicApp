import React, { useState, useEffect } from "react"
//import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';

import "./StepProgress.css"

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-US'

const StepProgress = (props) => {

  const { steps } = props;
  const { placeholder } = props;
  const [sintomas, setSintomas] = useState(['', '', '', '']);
  const [isListening, setIsListening] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(null)

  useEffect(() => {
    handleListen()
    // eslint-disable-next-line
  }, [isListening])

  const handleListen = () => {
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
      let sistomasCopy = [...sintomas]
      sistomasCopy[currentIdx] = transcript.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
      setSintomas(sistomasCopy)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  const handleChange = (event, idx) => {
    let sistomasCopy = [...sintomas]
    sistomasCopy[idx] = event.target.value
    setSintomas(sistomasCopy);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //props.history.push(`/search/name/${name}`);
  };

  return (
    <div className="StepProgress-container">
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
                            value={sintomas[idx]}
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
