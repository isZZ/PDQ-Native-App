import { ADD_USER_PROFILE } from '../actions/user_profiles.js'

const initialState = {
  user_profiles:{},
}

export default function user_profiles( state = initialState, action ) {

  //action.state is undefined on first run
  switch ( action.type ) { 

  case ADD_USER_PROFILE:
    let { user_profiles } = state;
    //let idAlreadyExists = ( action.id in user_profiles );

    return {
      ...state,
      user_profiles: Object.assign({}, state.user_profiles, {[action.id]:action.profile })
    }

  default:
    return state
  }
}