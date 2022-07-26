import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Speech from 'speak-tts'

import Card from './../components/Card';
import DetailedTable from './../components/DetailedTableFA';
import { getFirstAidDetails } from './../actions/defaultActions';
import LoadingBox from './../components/LoadingBox';
import "./FirstAid.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const FirstAid = (props) => {
    const [alertConfig, setAlertConfig] = useState({type: "", message: ""});
    const [openAlert, setOpenAlert] = useState(false)
    const [itemSelected, setItemSelected] = useState(null)
    const [speaker, setSpeaker] = useState(null)
    const [firstAid, setFirstAid] = useState([])

    const dispatch = useDispatch();
    const firstAidDetails = useSelector((state) => state.firstAidDetails);
    const {firstAidDetailsList, error, loading} = firstAidDetails

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

    useEffect(() => {
        if(firstAidDetailsList){
            let array_object_details = []
            Object.keys(firstAidDetailsList).forEach(detailKey => {
                if(
                    detailKey !== '_id' && 
                    detailKey !== '__v' && 
                    detailKey !== 'nombre' &&
                    detailKey !== 'Titulos'
                ){
                    array_object_details.push({title: firstAidDetailsList["Titulos"][detailKey], description: firstAidDetailsList[detailKey]})
                }   
              })
            setFirstAid(array_object_details)
        }
    }, [firstAidDetailsList])

    useEffect(() => {
        if(error){
            setAlertConfig({type: "error", message: error})
            setOpenAlert(true)
        }
    }, [error])

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

    const resumeDescription = (description) => {
        dispatch(getFirstAidDetails(description))
        setItemSelected(description)
    }

    return(
        <div className="FirstAid">
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
              <Alert severity={alertConfig.type} sx={{ width: "100%" }}>
                {alertConfig.message}
              </Alert>
            </Snackbar>
            <div className="col1">
                <div className="col1-izq">
                    <Card description={"Atención General"} onClick={() => resumeDescription("Atención General")}/>
                    <Card description={"Traslado del Paciente"} onClick={() => resumeDescription("Traslado del Paciente")} />
                    <Card description={"Heridas y Hemorragias"} onClick={() => resumeDescription("Heridas y Hemorragias")} />
                    <Card description={"Contusiones o Golpes"} onClick={() => resumeDescription("Contusiones o Golpes")} />
                    <Card description={"Quemaduras"} onClick={() => resumeDescription("Quemaduras")} />
                </div>
                <div className="col1-der">
                    <Card description={"Lesiones músculo-esqueléticas"} onClick={() => resumeDescription("Lesiones músculo-esqueléticas")}/>
                    <Card description={"Obstrucción de la via aérea"} onClick={() => resumeDescription("Obstrucción de la via aérea")}/>
                    <Card description={"Intoxicación"} onClick={() => resumeDescription("Intoxicación")}/>
                    <Card description={"Botiquín de emergencias"} onClick={() => resumeDescription("Botiquín de emergencias")}/>
                    <Card description={"Reanimación"} onClick={() => resumeDescription("Reanimación")}/>
                </div>
            </div>
            <div className="col2">
                <div className='col2-title'>
                    <p>{itemSelected ?? "DESCRIPCIÓN"}</p>
                </div>
                <div className="detailed-table-container">
                    {
                        loading ? 
                        <LoadingBox/> : 
                        <DetailedTable 
                            items={itemSelected ? firstAid : []} 
                            toSpeaker={toSpeaker} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default FirstAid;