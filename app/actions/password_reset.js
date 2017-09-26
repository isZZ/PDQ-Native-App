import * as firebase from 'firebase';
//import { FIREBASE_CONFIG } from '../constants/config';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import { navigatePush } from '../actions/navigation';

// *** Action Types ***
export const FETCHING_PASSWORDRESET = 'FETCHING_PASSWORDRESET'
export const SUCCESS_PASSWORDRESET = 'SUCCESS_PASSWORDRESET'
export const FAILURE_PASSWORDRESET = 'FAILURE_PASSWORDRESET'

//const firebaseApp = firebase.initializeApp( FIREBASE_CONFIG );

// *** Action Creators ***
// The following action creators were derived from SignupReducer
export function passwordResetFetching() {
	return {
		type: FETCHING_PASSWORDRESET,
	}
}

export function passwordResetSuccess() {
	return {
		type: SUCCESS_PASSWORDRESET,
	}
} 

export function passwordResetFailure( error ) {
	return {
		type: FAILURE_PASSWORDRESET,
		error: error
	}
}

export function passwordResetSubmit( email ) {
	
  return dispatch => { 

			dispatch( passwordResetFetching() );

			firebase.auth().sendPasswordResetEmail( email ).then( ( response ) => {

				dispatch( passwordResetSuccess() );

			} ).catch( ( error ) => {

				var message;
				switch( error.code ){
					case "auth/invalid-email":
	            		message = 'Sorry that is not a valid email address, please try again';
	      			break;
		            case "auth/user-not-found":
		            	message = 'Sorry a user with that email does not exist, please try again'; 
		            break;
			        default:
			        	message = 'An error occured trying to recover your password, please try again later';
			        break; 
				} 

				ToastAndroid.show( message , ToastAndroid.LONG );
				dispatch( passwordResetFailure({
					'code': error.code, 
					'message' : message
				}));		
			})
			
  };
}