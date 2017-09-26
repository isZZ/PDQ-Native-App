import { RESET_AUTHVALIDATION, ERROR_AUTHVALIDATION, UPDATE_AUTHVALIDATION, SUBMIT_AUTHVALIDATION, VALID_AUTHVALIDATION } from '../actions/auth_validation.js'

const initialLogState = {
	email: '',
	password: '',
	valid: false,
	messages: {
		email: false,
		password: false
	}
} 

export default function authValidation(state = initialLogState, action) {

	//action.state is undefined on first run
	switch (action.type) { 

	case RESET_AUTHVALIDATION:
	    return {
	    	...state
    	};

	case ERROR_AUTHVALIDATION:
		return {
			...state,
			...action.validation
    	};

	case UPDATE_AUTHVALIDATION:
		return{
			...state,
			...action.field
		}

	case VALID_AUTHVALIDATION:
		return{
			...state,
			...action.validation
		}

	default:
		return state
	}
}

export const getAuthValidationState = (state, filter) => {
	switch (filter){
		case 'all':
			return state;
		default:
			throw new Error('Unknown filter: ${filter}.');
	}
}