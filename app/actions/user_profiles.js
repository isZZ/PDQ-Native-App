import * as firebase from 'firebase';
//import { FIREBASE_CONFIG } from '../constants/config';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
//import { navigatePush } from '../actions/navigation';

// *** Action Types ***
export const ADD_USER_PROFILE = 'ADD_USER_PROFILE'

//const firebaseApp = firebase.initializeApp( FIREBASE_CONFIG );

// *** Action Creators ***
// The following action creators were derived from SignupReducer
export function addUserProfile( id, profile ) {
	return {
		type: ADD_USER_PROFILE,
		id,
		profile
	}
}

export function fetchUserProfile( id ) {
	return dispatch => {

  		var ref = firebase.database().ref( 'users/' ).child( id ).child( 'profile' );

  		ref.on( 'value',
 
  			function( snapshot ){
  				if(__DEV__){
	  				console.log('PROFILE SNAPSHOT');
	  				console.log(snapshot.val());
  				}
			    dispatch( addUserProfile( id, snapshot.val() ) );
	  		},
	  		function(error){
	  			if(__DEV__){
  					console.error('There was an error updating the profiles');
				}
	  		}

  		);
	}
};

export function fetchUserProfiles( ids = [] ) {
	return dispatch => {
		for(let id of ids){
			dispatch( fetchUserProfile( id ) );
		}
		return Promise.resolve();
	}
}

export function fetchConversationUserProfiles() {
	return ( dispatch, getState ) => {
		const {conversation} = getState();
		let { conversationUserIds } = conversation;
		for(conversationUserId in conversationUserIds){
			dispatch( fetchUserProfile( conversationUserId ) );
		}
	}
}