import { FETCHING_USER, SUCCESS_USER, FAILURE_USER } from '../actions/user.js'

const initialState = {
	isFetching: false,
	isUpdated: false,
	error: null,
} 

export default function user( state = initialState, action ) {

	//action.state is undefined on first run
	switch (action.type) { 

	case FETCHING_USER:
	    return {
	    	...state,
	        isFetching: true,
    	};

	case SUCCESS_USER:
		return {
			...state,
    		isFetching: false,
            isUpdated: true,
			error: null,
    	};

	case FAILURE_USER: {
        return {
    		isFetching: false,
            isUpdated: false,
			error: action.error,
        };
	}

	default:
		return state
	}
}