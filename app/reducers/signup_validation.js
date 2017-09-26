import { RESET_SIGNUPVALIDATION, ERROR_SIGNUPVALIDATION, UPDATE_SIGNUPVALIDATION, VALID_SIGNUPVALIDATION } from '../actions/signup_validation.js'

const initialState = {
	email: '',
	password: '',
	valid: false,
	messages: {
		email: false,
		password: false,
	}
} 

export default function signupValidation(state = initialState, action) {

	//action.state is undefined on first run
	switch (action.type) { 

	case RESET_SIGNUPVALIDATION:
	    return {
	    	...state
    	};

	case ERROR_SIGNUPVALIDATION:
		return {
			...state,
			...action.validation
    	};

	case UPDATE_SIGNUPVALIDATION:
		return{
			...state,
			...action.field
		}

	case VALID_SIGNUPVALIDATION:
		return{
			...state,
			...action.validation
		}

	default:
		return state
	}
}
