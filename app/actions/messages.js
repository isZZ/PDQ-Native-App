import { View, Text, StyleSheet, TextInput, ToastAndroid, Platform } from 'react-native'
import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { conversationUpdateMeta } from '../actions/conversations'

var uuid = require('react-native-uuid')

// *** Action Types ***
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGES_WRITE = 'MESSAGES_WRITE'
export const MESSAGES_WRITE_IMAGE = 'MESSAGES_WRITE_IMAGE'

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const dirs = RNFetchBlob.fs.dirs
const prefix = ((Platform.OS === 'android') ? 'file://' : '')

export function messagesReceived( messagesIds, messagesObj, conversationId ){
	return ( dispatch ) => {
		return dispatch({ type: 'MESSAGES_RECEIVED', messagesIds, messagesObj, conversationId })
	} 
}

export function messagesFetch( conversationId ){
	return ( dispatch ) => {
		var uid = firebase.auth().currentUser.uid;
		var messagesObj = {};
		var messagesIds = [];
		firebase.database().ref('conversationsMessages/').child( conversationId ).orderByChild('createdAt').on('value', function( snapshot ) {
			snapshot.forEach( function( childSnapshot ) {
				if(childSnapshot.key){
					let key = childSnapshot.key;
					let val = childSnapshot.val();
					messagesObj[key] = val;
					if(messagesIds.indexOf(key)==-1){
						messagesIds.push(key);
					}
				}
			});
			dispatch( messagesReceived( messagesIds, messagesObj, conversationId ) );
		});
		return Promise.resolve();
	}
}

export function messagesWrite( messageObj ){

	let { text, user, image } = messageObj;
 
	return ( dispatch, getState ) => {

	  let location = getState().geolocation.location;

	  let uid = getState().auth.uid;
	  let conversationId = getState().conversation.conversationId;
	  console.log('state', getState().conversation);
	  let groupId = getState().conversations.conversationsMeta[conversationId].groupId;

	  let message = text;
	  let UID = uid;

	  var messageData = {
		conversationId,
		UID,
		groupId,
		createdAt:  firebase.database.ServerValue.TIMESTAMP, //ServerValue.TIMESTAMP, // eg. 1466094046,
		location: location || null,
		message: message || '',
	  };

	  if( image ){
		let { url, fullPath } = image;
		messageData['image'] = {
			url,
			fullPath
		}
	  }

	  //Should really be dispatched after but no time
	  dispatch( conversationUpdateMeta( messageData ) )

	  //Add a queue task for message
	  dispatch( addMessageToQueue( messageData ) );

	  //Send a notification
	  dispatch( addMessageNotification( messageData ) );

	  // Get a key for a new Post. 
	  var newPostKey = firebase.database().ref().child( 'conversationsMessages' ).child( conversationId ).push().key;

	  // Write the new post's data simultaneously in the posts list and the user's post list.
	  var updates = {};

	  updates['/conversationsMessages/'+conversationId+'/'+ newPostKey] = messageData;
	  //updates['/user-posts/' + uid + '/' + newPostKey] = messageData;

	  return firebase.database().ref().update(updates);

	} 
}

export function addMessageToQueue( messageData ){
	return ( dispatch, getState ) => {
		var ref = firebase.database().ref();
		var messageTask = ( typeof(messageData.image) !== 'undefined' )? 'invision_image' : 'natural_language';

		messageData._state = messageTask;

		var newPostKey = firebase.database().ref().child('queue').child('tasks').push( messageData ).key;
		var updates = {};
		updates['/queue/tasks/' + newPostKey] = messageData;

		console.log('PHOTO QUEUE DATA');
		console.log(JSON.stringify(messageData));

		firebase.database().ref().update(updates);

	}
}

export function addMessageNotification( messageData ){
	return ( dispatch, getState ) => {
		let uid = getState().auth.uid;
		let conversationId =  getState().conversation.conversationId;
		let conversationmeta = getState().conversations.conversationsMeta[conversationId];
		let users = conversationmeta['users'];

		let notificationData = messageData;

		notificationData._state = 'new_message_notification';
		notificationData.messageType = (typeof(notificationData.image) !== 'undefined' )?'image':'text';

		if(Object.keys(users).length > 1){
			firebase.database().ref().child('queue').child('tasks').push(notificationData);
		}

	}
}

export function messagesWriteImage( image ) {
	return dispatch => { 

		let { size, mime, height, width, path } = image;
		var fileName = path.replace(/^.*[\\\/]/, '');

		let uid = firebase.auth().currentUser.uid;

		var storageRef = firebase.storage().ref();
		var imageRef = storageRef.child( 'users/').child( uid ).child( uuid.v1() ).child( fileName );

		var metadata = {  
			contentType : mime,
		}

		let rnfbURI = RNFetchBlob.wrap( path )
		 Blob
			.build(rnfbURI, { mime })
			.then((blob) => {
				imageRef.put(blob, metadata).then((snapshot) => {
					let { fullPath, name, downloadURLs } = snapshot.metadata
					let messageObj = {
						image:{
							name,
							fullPath,
							url: downloadURLs[0]
						}
					}
					dispatch( messagesWrite( messageObj ) )
				}).catch(function(error) {
					// console.error('Upload failed:', error);
					// dispatch( userFailure(error) );
				});
			})
	}
}