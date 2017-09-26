import * as firebase from 'firebase'
//import { FIREBASE_CONFIG } from '../constants/config'
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import { navigatePush } from '../actions/navigation'
import {Actions} from 'react-native-router-flux'
import RNFetchBlob from 'react-native-fetch-blob'
var uuid = require('react-native-uuid')

// *** Action Types ***
export const FETCHING_USER = 'FETCHING_USER'
export const SUCCESS_USER = 'SUCCESS_USER'
export const FAILURE_USER = 'FAILURE_USER'

//const firebaseApp = firebase.initializeApp( FIREBASE_CONFIG );

// *** Action Creators ***
// The following action creators were derived from SignupReducer
export function userFetching() {
	return {
		type: FETCHING_USER,
	}
}

export function userSuccess() {
	return {
		type: SUCCESS_USER,
	}
}

export function userFailure( error ) {
	return {
		type: FAILURE_USER,
		error: error
	}
}

export function uploadAvatar( creds ) {
	return dispatch => { 

		let { size, mime, height, width, path } = image;
		var fileName = path.replace(/^.*[\\\/]/, '');

		let uid = firebase.auth().currentUser.uid;
		
		//let { fileName, data, path, fileSize, type, origURL, latitude, longitude, timestamp } = imageObj

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
					dispatch( userSuccess() )
				}).catch(function(error) {
					dispatch( userFailure(error) );
				});
			})
	}
}


export function writeUserProfile( imageObj, username ){
	return dispatch => {
		let uid = firebase.auth().currentUser.uid;
		let ref = firebase.database().ref();

		var updates = {};
		  updates['usernames/' + username] = uid;
		  updates['users/' + uid + '/profile/'] = {
			username,
			avatar: {
				url: imageObj.downloadURLs[0]
			} 
		}; 
		ref.update( updates, function(error){
			if( error ){
				dispatch( userError( error ) );
			}else{
				dispatch( userSuccess() );
				dispatch(Actions.main);
			}
		})
	}
	

	
}

export function userSubmit( creds ) {
	return dispatch => { 
		let { size, mime: type, height, width, path } = creds.imageData;
		let { username} = creds.username;
		var fileName = path.replace(/^.*[\\\/]/, '');

		dispatch( userFetching() );

		// let fileName = imageObj.fileName;
		// let imageBase64 = imageObj.data;
		// let fileSize = imageObj.fileSize;
		// 
		// let path

		let uid = firebase.auth().currentUser.uid;
		
		//let { fileName, data, path, fileSize, type, origURL, latitude, longitude, timestamp } = imageObj

		var storageRef = firebase.storage().ref();
		var imageRef = storageRef.child( 'users/').child( uid ).child( uuid.v1() ).child( fileName );

		var metadata = {  
			contentType : type,
		}

		let rnfbURI = RNFetchBlob.wrap( path )
		 Blob
    		.build(rnfbURI, { type })
			.then((blob) => {
				imageRef.put(blob, metadata).then((snapshot) => {
					let { fullPath, name, downloadURLs } = snapshot.metadata
					let imageObj = {
						fullPath,
						name,
						downloadURLs
					}
					dispatch( writeUserProfile( imageObj, creds.username ) )
				}).catch(function(error) {
					dispatch( userFailure(error) );
				});
			})
	}
}