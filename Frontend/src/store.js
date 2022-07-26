import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  diagnosisReducer,
  nearestPlacesReducer,
  diseasesResultsReducer,
  diseaseDetailsReducer,
  firstAidDetailsReducer
} from './reducers/defaultReducers';

const initialState = {
};

const reducer = combineReducers({
  diagnosis: diagnosisReducer,
  nearestPlaces: nearestPlacesReducer,
  diseasesResults: diseasesResultsReducer,
  diseaseDetails: diseaseDetailsReducer,
  firstAidDetails: firstAidDetailsReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
