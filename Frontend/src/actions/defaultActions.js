import Axios from 'axios';
import {
  GET_DIAGNOSIS_REQUEST,
  GET_DIAGNOSIS_SUCCESS,
  GET_DIAGNOSIS_FAIL,
  GET_NEAREST_PLACES_REQUEST,
  GET_NEAREST_PLACES_SUCCESS,
  GET_NEAREST_PLACES_FAIL,
  GET_DISEASES_RESULTS_REQUEST,
  GET_DISEASES_RESULTS_SUCCESS,
  GET_DISEASES_RESULTS_FAIL,
  GET_DISEASE_DETAILS_REQUEST,
  GET_DISEASE_DETAILS_SUCCESS,
  GET_DISEASE_DETAILS_FAIL,
  GET_FIRST_AID_DETAILS_REQUEST,
  GET_FIRST_AID_DETAILS_SUCCESS,
  GET_FIRST_AID_DETAILS_FAIL
} from '../constants/defaultConstants';

const SERVER_API = process.env.REACT_APP_SERVER_API 

export const getDiagnosis = (body) => async (dispatch) => {
  dispatch({ type: GET_DIAGNOSIS_REQUEST, payload: body });
  try {
    const { data } = await Axios.post(`${SERVER_API}/Sintomas/enfermedadesRelacionadas`, body);
    dispatch({ type: GET_DIAGNOSIS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_DIAGNOSIS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNearestPlaces = (lat, lng, radius, type, googleApiKey) => async (dispatch) => {
  dispatch({ type: GET_NEAREST_PLACES_REQUEST });
  try {
    const { data } = await Axios.post(`${SERVER_API}/Maps/getNearestPlaces`, {lat, lng, radius, type, googleApiKey});
    dispatch({ type: GET_NEAREST_PLACES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_NEAREST_PLACES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiseasesResults = (disease) => async (dispatch) => {
  dispatch({ type: GET_DISEASES_RESULTS_REQUEST });
  try {
    const { data } = await Axios.get(`${SERVER_API}/Enfermedad/getEnfermedades?enfermedad=${encodeURIComponent(disease)}`);
    dispatch({ type: GET_DISEASES_RESULTS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_DISEASES_RESULTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDiseaseDetails = (disease) => async (dispatch) => {
  dispatch({ type: GET_DISEASE_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`${SERVER_API}/Enfermedad/getEnfermedad?nombre=${encodeURIComponent(disease)}`);
    dispatch({ type: GET_DISEASE_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_DISEASE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFirstAidDetails = (firsAid) => async (dispatch) => {
  dispatch({ type: GET_FIRST_AID_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`${SERVER_API}/Emergencia/get/${encodeURIComponent(firsAid)}`);
    dispatch({ type: GET_FIRST_AID_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_FIRST_AID_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};