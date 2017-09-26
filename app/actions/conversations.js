import * as firebase from 'firebase';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import {navigatePush} from '../actions/navigation';
import {fetchUserProfile} from '../actions/user_profiles'
import {Actions} from 'react-native-router-flux'

// *** Action Types ***
export const CONVERSATIONS_ADD = 'CONVERSATIONS_ADD'
export const CONVERSATIONS_ADD_META = 'CONVERSATIONS_ADD_META'

export function conversationsFetch() {
	return (dispatch, getState) => {
		dispatch( conversationsLoad() );
	};
}

export function conversationsLoad() {
	return (dispatch, getState) => {
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users/').child( uid ).child('conversations').orderByChild('updatedAt').on('value', (snapshot) => {
			
			let conversationIds = [];
			let conversationsMeta = {}
			let converationObj = snapshot.val();
			for( let key in converationObj ){
				conversationIds.push(key);
				conversationsMeta[key] = converationObj[key]
			}

			conversationIds = conversationIds.reverse();

			dispatch( conversationsAdd( conversationIds ) ).then( function( conversationIds ){ 
				dispatch( conversationsAddMeta( conversationsMeta ) )
			});
		});
	};
}

export function conversationsGetMeta( conversationIds ) {
	return (dispatch, getState) => {
		for ( var conversationId of conversationIds ) {
				firebase.database().ref('conversationsMeta/').child( conversationId ).on('value', function( snapshot ) {
					let conversationsMeta = snapshot.val();
					dispatch( conversationsAddMeta( conversationId, conversationsMeta ) );
				});
		}
	};
}

export function conversationsAdd( conversationIds ){
	return ( dispatch ) => {
		dispatch({ 
			type: 'CONVERSATIONS_ADD',
			conversationIds
		})
		return Promise.resolve( conversationIds )
	}
}

export function conversationsAddMeta( conversationsMeta ){
	return (dispatch, getState) => {
		dispatch({ type: 'CONVERSATIONS_ADD_META', conversationsMeta })
	}
}

export function conversationUpdateMeta( latestMessage ){
	return ( dispatch, getState ) => {
		
		let state = getState();
		let { conversationId, conversationUserIds } = state.conversation;
		let updates = {};

		var ref = firebase.database().ref(); 

		var conversationMeta = {
			updatedAt:  firebase.database.ServerValue.TIMESTAMP,
			latestMessage
		}

		ref.child( 'conversations' ).child( conversationId ).child( 'updatedAt' ).set( firebase.database.ServerValue.TIMESTAMP );
		ref.child( 'conversations' ).child( conversationId ).child( 'latestMessage' ).set( latestMessage );

		ref.child( 'conversationsMeta' ).child( conversationId ).child( 'updatedAt' ).set( firebase.database.ServerValue.TIMESTAMP );
		ref.child( 'conversationsMeta' ).child( conversationId ).child( 'latestMessage' ).set( latestMessage );
		
		for( let key in conversationUserIds ){

			let uid = conversationUserIds[key];

			ref.child( 'users' ).child( uid ).child( 'conversations' ).child( conversationId ).child( 'updatedAt' ).set( firebase.database.ServerValue.TIMESTAMP );
			ref.child( 'users' ).child( uid ).child( 'conversations' ).child( conversationId ).child( 'latestMessage' ).set( latestMessage );

		}
	}
}


function getUserConversationsIds() {
	return dispatch => {
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users/').child( uid ).child('conversations').then(function(snapshot) {
			var conversationIds = [];
			snapshot.forEach(function(childSnapshot) {
				conversationIds.push( childSnapshot.key );
			});
			return conversationIds;
		});
	}
}