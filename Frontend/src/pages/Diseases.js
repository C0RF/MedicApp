import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Speech from 'speak-tts'

import SearchBox from './../components/SearchBox';
import DetailedTable from './../components/DetailedTable';
import InfoPreviewer from './../components/InfoPreviewer';
import LoadingBox from './../components/LoadingBox';
import { getDiseasesResults, getDiseaseDetails } from './../actions/defaultActions';
import "./Diseases.css"


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })
  

const Diseases = (props) => {
    const [alertConfig, setAlertConfig] = useState({type: "", message: ""});
    const [previewData, setPreviewData] = useState([])
    const [detailedData, setDetailedData] = useState([])
    const [previewSelected, setPreviewSelected] = useState("")
    const [openAlert, setOpenAlert] = useState(false)
    const [speaker, setSpeaker] = useState(null)

    const dispatch = useDispatch();
    const diseasesResults = useSelector((state) => state.diseasesResults);
    const diseaseDetails = useSelector((state) => state.diseaseDetails);
    const {diseasesResultsList, error: errorDiseasesResultsList, loading: loadingDiseasesResultsList} = diseasesResults
    const {diseaseDetailsList, error: errorDiseaseDetailsList, loading: loadingDiseaseDetailsList} = diseaseDetails

    useEffect(() => {
        dispatch(getDiseasesResults(""))
    }, [dispatch])

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
        if(previewSelected.title && previewSelected.description){
            dispatch(getDiseaseDetails(previewSelected.title))
        }
    }, [dispatch, previewSelected])

    useEffect(() => {
        if(diseasesResultsList){
            let array_object_results = []
            diseasesResultsList.forEach(item => {
            array_object_results.push(
                {
                    title: item.nombre, 
                    description: item.descripcion
                })
            })
            setPreviewData(array_object_results)
        }
    }, [diseasesResultsList])

    useEffect(() => {
        if(diseaseDetailsList){
            let array_object_details = []
            Object.keys(diseaseDetailsList[0]).forEach(detailKey => {
                if(
                    detailKey !== '_id' && 
                    detailKey !== '__v' && 
                    detailKey !== 'nombre' && 
                    detailKey !== 'descripcion'&&
                    detailKey !== 'sintomas'
                ){
                    array_object_details.push({title: detailKey, description: diseaseDetailsList[0][detailKey]})
                }
                else{
                    if(detailKey === 'sintomas'){
                        var sintomas_description = "";
                        diseaseDetailsList[0][detailKey].forEach((it)=>sintomas_description=sintomas_description.concat(", ",it[0]));
                        array_object_details.push({title: detailKey, description: sintomas_description.substring(2)});
                    }
                }   
              })
            setDetailedData(array_object_details)
        }
    }, [diseaseDetailsList])

    useEffect(() => {
        if(errorDiseasesResultsList ){
            setAlertConfig({type: "error", message: errorDiseasesResultsList})
            setPreviewData([])
            setOpenAlert(true)
        }

        if(errorDiseaseDetailsList ){
            setAlertConfig({type: "error", message: errorDiseaseDetailsList})
            setPreviewData([])
            setOpenAlert(true)
        }
    }, [errorDiseasesResultsList, errorDiseaseDetailsList])

    useEffect(() => {
        if(alertConfig.type && alertConfig.message){
          setOpenAlert(true)
        }
          
      }, [alertConfig]);

    const handleClose = (event, reason) => {
        setOpenAlert(false)
      }
    
    const handlerSearch = (searchedText) => {
        dispatch(getDiseasesResults(searchedText.trim()))
    }

    const handlerSelector = (seletedItem) => {
        setPreviewSelected(seletedItem)
    }

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

    return(
        <div className="diseases">
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
              <Alert severity={alertConfig.type} sx={{ width: "100%" }}>
                {alertConfig.message}
              </Alert>
            </Snackbar>
            <div className='left-diseases'>
                <div className='search-container'> 
                    <SearchBox 
                        placeholder="Ingrese el nombre de la enfermedad" 
                        handlerSearch={handlerSearch}
                    />
                </div>
                <div className="info-previewer-container">
                    {
                        loadingDiseasesResultsList ? 
                        <LoadingBox /> : 
                        <InfoPreviewer 
                            items={previewData} 
                            handlerSelector={handlerSelector}
                        />
                    }
                </div>
            </div>
            <div className='right-diseases'>
                {
                    loadingDiseaseDetailsList ? 
                    <LoadingBox /> :
                    <>
                        <div className='right-diseases-title'>
                            <p>{previewSelected.title ?? "DETALLES"}</p>
                        </div>
                        <p>{previewSelected.description ?? "Aqui aparecerán los detalles de la enfermedad"}</p>
                        <div className="detailed-table-container">
                            <DetailedTable 
                                items={previewSelected.title ? detailedData : []} 
                                toSpeaker={toSpeaker} 
                            />
                        </div>
                    </>
                    
                }
                
            </div>
        </div>
    )
}

export default Diseases;