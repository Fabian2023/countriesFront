import { GET_COUNTRIES,GET_ACTIVITY,GET_COUNTRYID   } from "./actions.type";
import axios from 'axios';

export const GetCountries = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://countriesback-production-14f4.up.railway.app/countries');
      //console.log(response.data); 
      dispatch({ type: GET_COUNTRIES , payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const Getactivity = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('https://countriesback-production-14f4.up.railway.app/countries/activities');
      
      dispatch({ type: GET_ACTIVITY  , payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetCountryId = (idPais) => {
  return async function (dispatch) {
    try {
      console.log("idPais in GetCountryId:", idPais)
      const response = await axios.get(`https://countriesback-production-14f4.up.railway.app/countries/${idPais}`);
      console.log(response.data);
      dispatch({ type: GET_COUNTRYID, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

