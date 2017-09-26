import { FETCHING_PASSWORDRESET, SUCCESS_PASSWORDRESET, FAILURE_PASSWORDRESET } from '../actions/password_reset.js'

const initialState = {
	isFetching: false,
	isReset: false,
	error: null,
} 

export default function passwordReset( state = initialState, action ) {

	//action.state is undefined on first run
	switch (action.type) { 

	case FETCHING_PASSWORDRESET:
	    return {
	    	...state,
	        isFetching: true,
    	};

	case SUCCESS_PASSWORDRESET:
		return {
			...state,
    		isFetching: false,
            isReset: true,
			error: null,
    	};

	case FAILURE_PASSWORDRESET: {
        return {
    		isFetching: false,
            isReset: false,
			error: action.error,
        };
	}

	default:
		return state
	}
}