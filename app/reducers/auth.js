import { LOGIN_AUTH, LOGOUT_AUTH, ERROR_AUTH, FETCHING_AUTH } from '../actions/auth.js'

const initialLogState = {
	isFetching: false,
	isAuthenticated: false,
	error: null,
	uid: null
} 

export default function auth( state = initialLogState, action ) {

	//action.state is undefined on first run
	switch (action.type) { 

	case FETCHING_AUTH:
	    return {
	    	...state,
	        isFetching: true,
    	};

	case LOGIN_AUTH:
		return {
			...state,
    		isFetching: false,
            isAuthenticated: true,
			error: null,
			uid: action.uid
    	};

	case LOGOUT_AUTH:
		return {
			...state,
    		isFetching: false,
            isAuthenticated: false,
			error: null,
			uid: null
    	};

	case ERROR_AUTH: {
        return {
    		isFetching: false,
            isAuthenticated: false,
			error: action.error,
        };
	}

	default:
		return state
	}
}