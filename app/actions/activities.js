import * as firebase from 'firebase';
//import { FIREBASE_CONFIG } from '../constants/config';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import { navigatePush } from '../actions/navigation';
import { fetchUserProfile } from '../actions/user_profiles'

// *** Action Types ***
export const FETCHING_ACTIVITIES = 'FETCHING_ACTIVITIES'
export const UPDATED_ACTIVITIES   = 'UPDATED_ACTIVITIES'
export const ERROR_ACTIVITIES    = 'ERROR_ACTIVITIES'

export function activitiesFetching() {
  return {
    type: FETCHING_ACTIVITIES,
  }
}

export function activitiesError( error ) {
  return {
    type: FETCHING_ACTIVITIES,
    error
  }
}

export function activitiesUpdated( activity ) {
  return {
    type: UPDATED_ACTIVITIES,
    activity
  }
}

export function activitiesRecent() {
  return dispatch => {

  		dispatch( activitiesFetching() );
  		var uid = firebase.auth().currentUser.uid;
  		var ref = firebase.database().ref('users/').child(uid).child('activities');

  		ref.limitToFirst(20).on( 'value',
 
  			function( snapshot ){

	  			snapshot.forEach(function(childSnapshot) {
	  				
	  				var activity = {}

				    var key = childSnapshot.key;
				    var childData = childSnapshot.val();
				    
				    activity[key] = childData;

				    Promise.all([
				        dispatch( activitiesUpdated( activity ) ),
				        dispatch( fetchUserProfile( childData.originatorUID ) )
				    ]);

	  			});
	  		},
	  		function(error){
  				dispatch( activitiesError(error) );
	  		}

  		);

  			


	};
}