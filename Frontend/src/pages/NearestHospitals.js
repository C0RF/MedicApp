import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import SlideTable from './../components/SlideTable';
import Map from './../components/Map';
import LoadingBox from './../components/LoadingBox';
import './NearestHospitals.css';


const NearestHospitals = (props) => {
    const [locationSelected, setLocationSelected] = useState("")
    const [nearestPlaces, setNearestPlaces] = useState([])

    const nearestPlacesSelector = useSelector((state) => state.nearestPlaces);
    const {loading} = nearestPlacesSelector

    const handlerSelector = (location) => {
        setLocationSelected(location)
    }

    return(
        <div className="NearestHospitals">
            <div className="left-NearestHospitals">
                <div className="left-NearestHospitals-title">
                    <p>Hospitales más cercanos a tu ubicación actual</p>
                </div>
                <div className="slide-table-container">
                    {
                        loading ? 
                        <LoadingBox /> : 
                        <SlideTable items={nearestPlaces} handlerSelector={handlerSelector}/>
                    }
                </div>
            </div>
            <div className="right-NearestHospitals">
                <Map locationSelected={locationSelected} setNearestPlaces={setNearestPlaces}/>
                {/* <img alt="" src="/images/hospitales.jpg"/> */}
            </div>
        </div>
    )
}

export default NearestHospitals;