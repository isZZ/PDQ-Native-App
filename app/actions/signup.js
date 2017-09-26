import * as firebase from 'firebase';
//import {FIREBASE_CONFIG} from '../constants/config';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import {navigatePush} from '../actions/navigation';
import {Actions} from 'react-native-router-flux'

//const firebaseApp = firebase.initializeApp( FIREBASE_CONFIG );

// *** Action Types ***
export const FETCHING_SIGNUP = 'FETCHING_SIGNUP'
export const SUCCESS_SIGNUP = 'SUCCESS_SIGNUP'
export const FAILURE_SIGNUP = 'FAILURE_SIGNUP'

// *** Action Creators ***
// The following action creators were derived from SignupReducer
export function signupFetching() {
	return {
		type: FETCHING_SIGNUP,
	}
}

export function signupSuccess() {
	return {
		type: SUCCESS_SIGNUP,
	}
}

export function signupFailure( error ) {
	return {
		type: FAILURE_SIGNUP,
		error: error
	}
}

export function signupSend( creds ) {
  return dispatch => { 
  		dispatch( signupFetching() );
		return firebase.auth().createUserWithEmailAndPassword( creds.email, creds.password ).then( ( user ) => {

			var uid = firebase.auth().currentUser.uid;
			firebase.database().ref('users/' + uid).set({
				email: user.email,
				photoURL: user.photoURL,
				displayName: user.displayName,
			}).then(() => {
				Promise.all([
					dispatch( signupSuccess() ),
					Actions.sceneSubscribeProfile()
				]);    
			}).catch( (error) => {
				if(__DEV__){
					console.log( 'error' )
				}
			} )

		}).catch( ( error ) => {
			var message;
			switch( error.code ){
				case "auth/email-already-in-use":
            		message = 'Sorry that email is or already in use.';
      			break;
	            case "auth/invalid-email":
	            	message = 'Sorry the email provided was not a valid email'; 
	            break;
		        case "auth/operation-not-allowed":
		        	message = 'Sorry email/password accounts are not enabled, please authenticate with an alternative method';
		        break;
		        case "auth/weak-password":
		        	message = 'Sorry but you must provide a stronger password';
        	 	break;
		        case "auth/too-many-requests":
		        	message = 'Sorry there have been to many subscription requests from this computer, please try again later';
	        	break;
		        default:
		        	message = 'An unidentified error occured when subscribing the user, please contact email support';
		        break; 
			} 
			ToastAndroid.show( message , ToastAndroid.LONG );
			dispatch( signupFailure({
				'code': error.code, 
				'message' : message
			}) );
		});
  };
}