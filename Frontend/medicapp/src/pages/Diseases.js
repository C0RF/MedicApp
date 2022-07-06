import React from 'react';

import SearchBox from './../components/SearchBox';
import DetailedTable from './../components/DetailedTable';
import InfoPreviewer from './../components/InfoPreviewer';
import "./Diseases.css"


const detailed_data= [
    {
        title: "Síntomas",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Causas",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Recomendaciones",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Consideraciones adicionales",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
]

const preview_data= [
    {
        title: "Enfermedad 1",
        description: "Breve descripción."
    },
    {
        title: "Osteogénesis Imperfecta",
        description: "Conjunto de trastornos hereditarios caracterizados por huesos frágiles que se fracturan fácilmente."
    },
    {
        title: "Enfermedad 2",
        description: "Breve descripción."
    },
    {
        title: "Enfermedad 3",
        description: "Breve descripción."
    },
]

const Diseases = (props) => {
    return(
        <div className="diseases">
            <div className='left-diseases'>
                <div className='search-container'> 
                    <SearchBox placeholder="Ingrese el nombre de la enfermedad"/>
                </div>
                <div className="info-previewer-container">
                    <InfoPreviewer items={preview_data} />
                </div>
            </div>
            <div className='right-diseases'>
                <div className='right-diseases-title'>
                    <p>Osteogénesis Imperfecta</p>
                </div>
                <p>Conjunto de trastornos hereditarios caracterizados por huesos frágiles que se fracturan fácilmente.</p>
                <div className="detailed-table-container">
                    <DetailedTable items={detailed_data} />
                </div>
            </div>
        </div>
    )
}

export default Diseases;