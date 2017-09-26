import { FETCHING_SIGNUP, SUCCESS_SIGNUP, FAILURE_SIGNUP } from '../actions/signup.js'

const initialState = {
	isFetching: false,
	isSignedup: false,
	error: null,
} 

export default function signup( state = initialState, action ) {

	//action.state is undefined on first run
	switch (action.type) { 

	case FETCHING_SIGNUP:
	    return {
	    	...state,
	        isFetching: true,
    	};

	case SUCCESS_SIGNUP:
		return {
			...state,
    		isFetching: false,
            isSignedup: true,
			error: null,
    	};

	case FAILURE_SIGNUP: {
        return {
    		isFetching: false,
            isSignedup: false,
			error: action.error,
        };
	}

	default:
		return state
	}
}