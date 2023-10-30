import { GET_COUNTRIES,GET_ACTIVITY,GET_COUNTRYID  } from "./actions.type";

const initialState = {
  countries: [],
  activities:[],
  countryId:[]
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };

      case GET_ACTIVITY:
        return {
          ...state,
          activities: payload,
        }; 
        
        case GET_COUNTRYID:
          return {
            ...state,
            countryId: [payload],
          };



    default:
      return state;
  }
};

export default reducer;
