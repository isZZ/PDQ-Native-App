import { RESET_PASSWORDRESETVALIDATION, ERROR_PASSWORDRESETVALIDATION, UPDATE_PASSWORDRESETVALIDATION, VALID_PASSWORDRESETVALIDATION } from '../actions/password_reset_validation.js'

const initialState = {
	email: '',
	valid: false,
	messages: []
} 

export default function passwordResetValidation( state = initialState, action ) {

	//action.state is undefined on first run
	switch ( action.type ) { 

	case RESET_PASSWORDRESETVALIDATION:
	    return {
	    	...state
    	};

	case ERROR_PASSWORDRESETVALIDATION:
		return {
			...state,
			...action.validation
    	};

	case UPDATE_PASSWORDRESETVALIDATION:
		return{
			...state,
			...action.field
		}

	case VALID_PASSWORDRESETVALIDATION:
		return{
			...state,
			...action.validation
		}

	default:
		return state
	}
}
