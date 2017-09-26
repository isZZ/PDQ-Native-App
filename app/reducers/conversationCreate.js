import { CONVERSATIONCREATE_CREATED, CONVERSATIONCREATE_UPDATING, CONVERSATIONCREATE_FAILED } from '../actions/conversationCreate.js'

initialState = {
	updating: false,
  error:false,
  key:false,
}

export default function conversation( state = initialState, action ) {

  switch (action.type) {

    case CONVERSATIONCREATE_UPDATING:
      return {
          ...state,
          updating: true,
          error:false,
          key:action.key,
      }

    case CONVERSATIONCREATE_CREATED:
      return {
            ...state,
            updating: false,
            error:false,
        }

    case CONVERSATIONCREATE_FAILED:
      return {
          ...state,
          updating: false,
          error:action.error,
      }

    case CONVERSATIONCREATE_RESET:
      return {
          ...initialState
      }

    default:
      return state

  }
  
}