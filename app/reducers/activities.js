import { FETCHING_ACTIVITIES, UPDATED_ACTIVITIES, ERROR_ACTIVITIES } from '../actions/activities.js'

const initialState = {
  isFetching: false,
  error: null,
  activities:{},
}

export default function auth( state = initialState, action ) {

  //action.state is undefined on first run
  switch (action.type) { 

  case FETCHING_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
      };

  case UPDATED_ACTIVITIES:
    return {
        ...state,
        isFetching: false,
        activities: { ...state.activities, ...action.activity },
        error: null,
      };

  case ERROR_ACTIVITIES:
    return {
        ...state,
        isFetching: false,
        error: action.error,
      };

  default:
    return state
  }
}