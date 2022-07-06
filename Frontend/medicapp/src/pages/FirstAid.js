import React from 'react';
import Card from './../components/Card';
import DetailedTable from './../components/DetailedTable';

import "./FirstAid.css"

const detailed_data= [
    {
        title: "Normas de actuación",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Escenas de la emergencia",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Solicitud de auxilio",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Signos vitales",
        description: "El tratamiento puede ayudar pero no tiene cura. Requiere diagnóstico médico. Siempre se requieren análisis de laboratorio o estudios de diagnóstico por imágenes. Crónicas: pueden durar años o toda la vida."
    },
    {
        title: "Consideraciones adicionales",
        description: "No actúe precipitadamente. \nNo suministre líquidos o alimento previo a la evaluación médica. \nMantenga al público alejado. \nNunca abandone al accidentado y mantenga la calma para no aumentar su estrés."
    },
]

const FirstAid = (props) => {
    return(
        <div className="FirstAid">
            <div className="col1">
                <div className="col1-izq">
                    <Card description={"Atención General"} />
                    <Card description={"Traslado del Paciente"} />
                    <Card description={"Heridas y Hemorragias"} />
                    <Card description={"Contusiones o Golpes"} />
                    <Card description={"Quemaduras"} />
                </div>
                <div className="col1-der">
                    <Card description={"Lesiones músculo-esqueléticas"} />
                    <Card description={"Obstrucciones de la via aérea"} />
                    <Card description={"Intoxicación"} />
                    <Card description={"Botiquín de emergencias"} />
                    <Card description={"Reanimación"} />
                </div>
            </div>
            <div className="col2">
                <div className='col2-title'>
                    <p>ATENCIÓN GENERAL</p>
                </div>
                <div className="detailed-table-container">
                    <DetailedTable items={detailed_data} />
                </div>
            </div>
        </div>
    )
}

export default FirstAid;