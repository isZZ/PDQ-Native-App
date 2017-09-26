import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import {Actions} from 'react-native-router-flux'
import * as firebase from 'firebase';
import { navigateReset, navigatePush, navigatePop, navigateJumpToKey, navigateJumpToIndex } from '../actions/navigation.js'
import { conversationClick } from '../actions/conversation.js'

// *** Action Types ***
export const CONVERSATIONCREATE_UPDATING = 'CONVERSATIONCREATE_UPDATING'
export const CONVERSATIONCREATE_CREATED  = 'CONVERSATIONCREATE_CREATED'
export const CONVERSATIONCREATE_FAILED   = 'CONVERSATIONCREATE_FAILED'
export const CONVERSATIONCREATE_RESET   = 'CONVERSATIONCREATE_RESET'


export function conversationCreateUpdating( key ){
	return {
	    type: 'CONVERSATIONCREATE_UPDATING',
        key,
  	};
}

export function conversationCreateCreated(){
	return {
	    type: 'CONVERSATIONCREATE_CREATED',
  	};
}

export function conversationCreateFailed( error ){
	return {
	    type: 'CONVERSATIONCREATE_FAILED',
	    error
  	};
}

export function conversationCreateStart( groupId ){
	return ( dispatch, getState ) => {
		let state = getState();
		let groupIds = state.groups.groups;
		if(state.groups.groups.length>1){
			Actions.sceneChatOptionsGroupSelect()
		}else{
			Actions.sceneChatOptions({groupId:groupIds[0]})
		}
	}
}

export function conversationCreateGroupId( groupId ){
	return ( dispatch, getState ) => {
		Actions.sceneChatOptions({groupId})
	}
}

export function conversationCreate( conversationUsers, groupId ){

	return ( dispatch, getState ) => {

		let uid = getState().auth.uid;
		let conversationUsersObj = {}

		for( let key in conversationUsers ){
			let conversationUser = conversationUsers[key];
			conversationUsersObj[ conversationUser ] = 'participant';
		}

		//Add user back
		conversationUsersObj[ uid ] = 'creator';

		dispatch( conversationCreateAdd( conversationUsersObj, groupId ) ).then( function( key ){
			dispatch( conversationCreateCreated() )
			return key
		}).then( function( key ){
			return dispatch( conversationClick( key ) );
		}).then( function(){
			let newConversationUsers = getState().conversation.conversationUserIds;
			let userProfiles = getState().userProfiles.user_profiles;
			newUsersArray = [];
			for( let key in newConversationUsers ){
				let userID = newConversationUsers[key];
				let user =  userProfiles[userID]
				if( user.username && user.uid != uid ){
					newUsersArray.push( user.username )
				}
			}
		} )

	} 

}

export function conversationCreateAdd( conversationUsers, groupId ) {
	return ( dispatch, getState ) => {
		
		// Get a key for a new Post.
		var newConversationKey = firebase.database().ref().child( 'conversations' ).push().key;
		let uid = getState().auth.uid;

		dispatch( conversationCreateUpdating( newConversationKey ) )

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};

		var conversationMeta = {
			createdAt: firebase.database.ServerValue.TIMESTAMP,
			updatedAt: firebase.database.ServerValue.TIMESTAMP,
			createdBy: uid,
			users: conversationUsers,
			groupId
		}

		updates['/conversations/'+newConversationKey+'/'] = conversationMeta;
		//updates['/conversationsMeta/'+newConversationKey] = conversationMeta;
		updates['/conversationsMembers/'+newConversationKey] = conversationUsers;
		
		for( let conversationUserKey  in  conversationUsers ){
			updates['/users/'+conversationUserKey+'/conversations/'+newConversationKey] = {
				...conversationMeta
			};
		}

		//updates['/user-posts/' + uid + '/' + newPostKey] = messageData;

		return firebase.database().ref().update(updates).then(function(){
			return newConversationKey;
		}).catch(function( error ) {
	    // By returning a new promise, we "recover" from errors in the first.
	    	dispatch( conversationCreateFailed( error ) );
	  	});
	}

};