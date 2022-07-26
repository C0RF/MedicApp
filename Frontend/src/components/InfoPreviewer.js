import React, { useState, useEffect } from "react"
import { IconButton } from '@mui/material';
import Speech from 'speak-tts'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

import "./InfoPreviewer.css"
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

const InfoPreviewer = (props) => {

  const { items, handlerSelector } = props
  const [openAlert, setOpenAlert] = useState(false)
  const [speaker, setSpeaker] = useState(null)
  const [alertConfig, setAlertConfig] = useState({type: "", message: ""});

  useEffect(() => {
    const speech = new Speech() // will throw an exception if not browser supported
    if(!speech.hasBrowserSupport()) { // returns a boolean
        setAlertConfig({type: "warning", message: "Su navegador no soporta síntesis del habla"})
    }else{
        speech.init({
             'volume': 1,
             'lang': 'es-MX',
             'rate': 1,
             'pitch': 1,
             'voice':'Microsoft Camila Online (Natural) - Spanish (Peru)',
             'splitSentences': true,
             /* 'listeners': {
                 'onvoiceschanged': (voices) => {
                     console.log("Event voiceschanged", voices)
                 }
             } */
        })
        setSpeaker(speech)
    }
  }, [])

  useEffect(() => {
    if(alertConfig.type && alertConfig.message){
      setOpenAlert(true)
    }
      
  }, [alertConfig]);

  const toSpeaker = (text) => {
    if(speaker){
        console.log(`Correctamente pronunciado: ${text}`)
        speaker.speak({
            text,
            queue: false, // current speech will be interrupted,
            listeners: {
                onstart: () => {
                    console.log("iniciada la pronunciación")
                },
                onend: () => {
                    console.log("finalizada la pronunciación")
                },
                onresume: () => {
                    console.log("reanudada la pronunciación")
                },
                onboundary: (event) => {
                    console.log(
                        event.name + 
                        ' límite alcanzado después ' + 
                        event.elapsedTime + 
                        ' milisegundos.'
                    )
                }
            }
        }).then(() => {
            console.log(`Correctamente pronunciado: ${text}`)
        }).catch(e => {
            console.error("Ocurrió un error :", e)
        })
    }else{
        setAlertConfig({type: "error", message: "Operación no soportada"})
    }
  }

  const handleClose = (event, reason) => {
    setOpenAlert(false)
  }

  return (
    <>
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
            items.map((item, idx) => (
                <Link key={`link-${idx}`} style={{textDecoration: 'none'}} to="/diseases">
                    <div  key={`item-container-${idx}`} className="item-container">
                        <div 
                            key={`information-preview-${idx}`} 
                            className="information-preview"
                            onClick={() => handlerSelector({title: item.title, description: item.description})}
                        >
                            <h3>
                                {item.title}
                            </h3>
                            <div className="hline"/>
                            <p>{item.description}</p>
                        </div>
                        <div key={`speech-container-${idx}`} className="speech-container">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => toSpeaker(
                                    `${item.title}. ${item.description}`
                                    )}
                                edge="end"
                                className="primary"
                            >
                                <VolumeUpIcon />
                            </IconButton>
                        </div>
                    </div>
                </Link>
            ))
        }
    </>
  )
}

export default InfoPreviewer
