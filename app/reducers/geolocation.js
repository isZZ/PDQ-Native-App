import { GEOLOCATION_UPDATE } from '../actions/geolocation.js'

const initialState = {
  location:{
    // longitude:undefined,
    // latitude:undefined,
    // speed:undefined,
    // accuracy:undefined,
    // bearing:undefined,
    // altitude:undefined,
    // time:undefined,
    // locationProvider:undefined,
    // locationStationary:undefined
  }
}

export default function geolocation( state = initialState, action ) {

  switch (action.type) { 

    case GEOLOCATION_UPDATE:

    let { location } = action; 

      return {
        ...state,
        location,
      }

    default:
      return state

  }
  
}