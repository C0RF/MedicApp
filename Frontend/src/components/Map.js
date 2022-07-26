import React, { useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

import LoadingBox from './LoadingBox';
import { getNearestPlaces } from './../actions/defaultActions';
import distance from './../utils';
import './Map.css';


const libs = ['places'];
const defaultLocation = { lat: -12.0630149, lng: -77.0296179 };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY


export default function Map(props) {
  const { locationSelected, setNearestPlaces } = props
  const [openAlert, setOpenAlert] = useState(false)
  const [alertConfig, setAlertConfig] = useState({type: "", message: ""});
  const [center, setCenter] = useState(defaultLocation);
  const [nearestPlacesListFind, setNearestPlacesListFind] = useState([]);
  const [userLocation, setUserLocation] = useState(center);

  const dispatch = useDispatch();
  const nearestPlaces = useSelector((state) => state.nearestPlaces);
  const {nearestPlacesList, error } = nearestPlaces

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
      getUserCurrentLocation();
  }, []);

  useEffect(() => {
    dispatch(
      getNearestPlaces(userLocation.lat, userLocation.lng, 3000, "hospital", googleApiKey)
      ) 
}, [dispatch, userLocation]);

  useEffect(() => {
    if(nearestPlacesList && nearestPlacesList.length > 0){
      setNearestPlacesListFind(nearestPlacesList.map(np => {
        return {
          name: np.name,
          lat: np.geometry.location.lat,
          lng: np.geometry.location.lng,
          icon: np.icon,
          rating: np.rating,
          opening_hours: np.opening_hours,
          direction: np.vicinity,
          content: `${
            distance(
              np.geometry.location.lat, 
              np.geometry.location.lng, 
              userLocation.lat, 
              userLocation.lng
              )} km`
        }
      }))
    }
    // eslint-disable-next-line
  }, [nearestPlacesList])

  useEffect(() => {
    if(nearestPlacesListFind){
      setNearestPlaces(nearestPlacesListFind)
    }
    // eslint-disable-next-line
  }, [nearestPlacesListFind])


  useEffect(() => {
    if(alertConfig.type && alertConfig.message){
      setOpenAlert(true)
    }
      
  }, [alertConfig]);

  useEffect(() => {
    if(locationSelected && locationSelected.lat && locationSelected.lng){
      setCenter({
        lat: locationSelected.lat,
        lng: locationSelected.lng,
      });
    }
      
  }, [locationSelected]);

  useEffect(() => {
    if(error ){
        setAlertConfig({type: "error", message: error})
        setOpenAlert(true)
    }

}, [error])


  const handleClose = (event, reason) => {
    setOpenAlert(false)
  }

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      setAlertConfig({
        type: "error", 
        message: 'Geolocalización no soportada en este navegador'
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

      });
    }
  };
  

  return googleApiKey ? (
    <div className="map-container">
      <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
              <Alert severity={alertConfig.type} sx={{ width: "100%" }}>
                {alertConfig.message}
              </Alert>
      </Snackbar>
      <div className="mapContainerStyle">

      </div>
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
        >
          {
            userLocation && 
            <Marker position={userLocation} onLoad={onMarkerLoad}/>
          }
          {
            nearestPlacesListFind && nearestPlacesListFind.map((item, idx) => {
              return (
                <Marker 
                  key={`marker-${idx}`}
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }} 
                  onLoad={onMarkerLoad} 
                  icon={"https://i.imgur.com/SPHBKTr.png"}
              />
              )
              
            })
          }
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox/>
  );
}
