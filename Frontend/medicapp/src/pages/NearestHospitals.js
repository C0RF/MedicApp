import React from 'react';

import SlideTable from './../components/SlideTable';
import './NearestHospitals.css';


const data= [
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
    {
        name: "Hospital 1",
        content: "90 km"
    },
  ]

const NearestHospitals = (props) => {
    return(
        <div className="NearestHospitals">
            <div className="left-NearestHospitals">
                <div className="left-NearestHospitals-title">
                    <p>Hospitales más cercanos a tu ubicación actual</p>
                </div>
                <div className="slide-table-container">
                    <SlideTable items={data} />
                </div>
            </div>
            <div className="right-NearestHospitals">
                <img alt="" src="/images/hospitales.jpg"/>
            </div>
        </div>
    )
}

export default NearestHospitals;