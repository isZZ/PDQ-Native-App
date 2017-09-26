import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import * as firebase from 'firebase';
import { messagesFetch } from './messages'
import { fetchConversationUserProfiles } from './user_profiles'
import {Actions} from 'react-native-router-flux'

// *** Action Types ***
export const CONVERSATION_ADD = 'CONVERSATION_ADD'

export function conversationIdsAdd( conversationUsers ){
	return ( dispatch ) => {
		return dispatch({ type: 'CONVERSATION_ADD', conversationUsers })
	}
}

export function conversationClick( conversationId ){
	console.log('CONVERSATION CLICK');
	console.log(conversationId);
	return function(dispatch, getState){
		return conversationFetchUserIds( conversationId ).then(( conversationUsers ) => {
			console.log('CONVERSATION DISPATCHED');
			Promise.all([
				dispatch( conversationIdsAdd( { ...conversationUsers, conversationId } )),
				dispatch( messagesFetch( conversationId ) )
      		]);
		}).then( () => {
			state = getState();
			try{
				dispatch(fetchConversationTitle(conversationId)).catch((error)=>{console.log(error)}).then((title)=>{
					Actions.pop({ key: 'sceneDashboard' });
					Actions.sceneConversation({title});
				});
			}catch(error){
				if(__DEV__){
					console.log(error);
				}
			}
//			dispatch( fetchConversationUserProfiles())
		})
	}
}

// export function conversationFetchUserIds( conversationId ){
// 	return function(dispatch,getState){
// 		var ref = firebase.database().ref( 'conversationsMembers/' ).child( conversationId )
// 	    ref.on('value', function(snapshot){
// 			console.log(snapshot.val())
// 	    });
// 	}   
// }

export function fetchConversationTitle( conversationId ){
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			let state =  getState();
			//let conversationId = state.conversation.conversationId;
			let conversationUserIds = state.conversation.conversationUserIds;
			let userProfiles = state.userProfiles.user_profiles;
			let UID = state.auth.uid;
			let userNames = [];
			for(key in conversationUserIds){
				let userId = conversationUserIds[key];
				let userProfile = userProfiles[userId];

				if(UID == userId)
					continue;

				// //let userName = userProfiles[userId].user.name;
				// //let userProfile = userProfiles[conversationUserIds[key]];
				// console.log('USER PROFILE KEY');
				// console.log(userProfile);
				userNames.push(userProfile.username);
			}
			let userNamesString = userNames.join(",");
			userNamesString = userNamesString.substring(0, 20);

			resolve(userNamesString);
		})
	}

}

export function conversationFetchUserIds( conversationId ){
	return new Promise((resolve, reject) => {
		var ref = firebase.database().ref( 'conversationsMembers/' ).child( conversationId )
		ref.on('value', function(snapshot){
			let conversationUserRoles = {};
			let conversationUsers = snapshot.val();
			let conversationUserIds = [];
			for( var userId in conversationUsers ){
				conversationUserIds.push( userId );
				conversationUserRoles[userId] = conversationUsers[userId];
			}

			// snapshot.forEach( function(childSnapshot){
			// 	var id = childSnapshot.key();
			// 	console.log("CHILDSNAPSHOTKEY"+id);
			// 	//conversationUserIds.push( childSnapshot.key() );
			// 	//conversationUserRoles[childSnapshot.key()] = childSnapshot.val();
			// } );
			
			resolve({conversationUserIds, conversationUserRoles});
		});
	});
}
























// conversationFetchUserIds( conversationId ).then(
// 			usersObj => dispatch({ type: 'CONVERSATION_CLICK', conversationId, conversationUserIds, conversationUserRoles })
// 		.then( 
// 			usersObj => dispatch(function(){console.log('test')})
// 			// function( usersObj ){
// 			// 	console.log(usersObj+"usersObjusersObjusersObjusersObj")
// 			// 	// dispatch();
// 			// }
// 		)
// 		)

// export function conversationFetchUserIds( conversationId ){
// 	return dispatch => {
// 		return dispatch({ type: 'CONVERSATION_CLICK', conversationId, usersObject })
// 	}
	// return function(){
	// 	return 'test'
	// console.log('conversationIdconversationIdconversationIdconversationId'+conversationId);
	// var ref = firebase.database().ref( 'conversationsMembers/' ).child( conversationId );

 //  	ref.on( 'value',
 
 //  		function( snapshot ){
	// 		console.log('SNAPPPY'+JSON.stringify(snapshot.val()))
	// 		var conversationUserIds   = [];
	// 		var conversationUserRoles = {};

 //  			snapshot.forEach( function( childSnapshot ) {
	// 			console.log('SNAPPPY'+JSON.stringify(childSnapshot.val()))
	// 			let UID = childSnapshot.key();
	// 			let userRole = childSnapshot.val();

	// 			conversationUserIds.push( UID );
	// 			conversationUserRoles[UID] = userRole;

 //  			});
	// 		return {  conversationUserIds, conversationUserRoles };
 //  		},
 //  		function(error){
	// 		console.log('There was an error fetching users id')
 //  		}
	// )
	//}
// }