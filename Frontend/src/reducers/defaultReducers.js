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
  
  export const diagnosisReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_DIAGNOSIS_REQUEST:
        return { loading: true };
      case GET_DIAGNOSIS_SUCCESS:
        return { loading: false, diagnosisList: action.payload };
      case GET_DIAGNOSIS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const nearestPlacesReducer = (state = { loading: true}, action) => {
    switch (action.type) {
      case GET_NEAREST_PLACES_REQUEST:
        return { loading: true };
      case GET_NEAREST_PLACES_SUCCESS:
        return { loading: false, nearestPlacesList: action.payload };
      case GET_NEAREST_PLACES_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const diseasesResultsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_DISEASES_RESULTS_REQUEST:
        return { loading: true };
      case GET_DISEASES_RESULTS_SUCCESS:
        return { loading: false, diseasesResultsList: action.payload };
      case GET_DISEASES_RESULTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const diseaseDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_DISEASE_DETAILS_REQUEST:
        return { loading: true };
      case GET_DISEASE_DETAILS_SUCCESS:
        return { loading: false, diseaseDetailsList: action.payload };
      case GET_DISEASE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const firstAidDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_FIRST_AID_DETAILS_REQUEST:
        return { loading: true };
      case GET_FIRST_AID_DETAILS_SUCCESS:
        return { loading: false, firstAidDetailsList: action.payload };
      case GET_FIRST_AID_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  