import { RESET_USERVALIDATION, ERROR_USERVALIDATION, UPDATE_USERVALIDATION, VALID_USERVALIDATION } from '../actions/user_validation.js'

const initialState = {
	username: '',
	imageData:false,
	valid: false,
	messages: {
		username: false,
		imageData:false,
	}
} 

export default function userValidation( state = initialState, action ) {

	//action.state is undefined on first run
	switch ( action.type ) { 

	case RESET_USERVALIDATION:
	    return {
	    	...state
    	};

	case ERROR_USERVALIDATION:
		return {
			...state,
			...action.validation
    	};

	case UPDATE_USERVALIDATION:
		return{
			...state,
			...action.field
		}

	case VALID_USERVALIDATION:
		return{
			...state,
			...action.validation
		}

	default:
		return state
	}
}
