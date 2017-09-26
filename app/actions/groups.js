import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import * as firebase from 'firebase';
import { fetchUserProfiles } from '../actions/user_profiles';

// *** Action Types ***
export const GROUPS_FETCHING = 'GROUPS_FETCHING'
export const GROUPS_ADD = 'GROUPS_ADD'
export const GROUPS_ADD_USERS = 'GROUPS_ADD_USERS'
export const GROUPS_ADD_META = 'GROUPS_ADD_META'

export function addGroups( groups ) {
	return {
		type: 'GROUPS_ADD',
		groups
	};
}

export function addgroupsUsers( groupUsers ) {
	return {
		type: 'GROUPS_ADD_USERS',
		groupUsers
	};
}

export function addgroupMeta( groupId, groupMeta ) {
	return {
		type: 'GROUPS_ADD_META',
		groupId,
		groupMeta
	};
}

export function fetchGroups(){
	return ( dispatch, getState ) => {
		return dispatch( fetchUserGroups() )
	}
}

export function addGroupsAction( groups ){
	return ( dispatch, getState ) => {
		dispatch( addGroups( groups ) );
		return Promise.resolve( groups ) 
	}
}

export function addgroupsUsersAction( groups ){
	return ( dispatch, getState ) => {
		dispatch( addgroupsUsers( groups ) );
		return Promise.resolve( groups ) 
	}
}


export function addGroupsMeta( groups ){
	return ( dispatch ) => {
		for(let key in groups){
			let groupId = groups[key];
			var ref = firebase.database().ref( 'groups/' ).child( groupId );
			ref.on('value', function(snapshot){
				let groupMeta = snapshot.val();
				let users = [];
				dispatch(addgroupMeta( groupId, groupMeta));
				for(key in groupMeta.users){
					users.push(key);
				}
				dispatch(fetchUserProfiles(users));
			});
		}
	}
}


export function fetchUserGroups(){
	var uid = firebase.auth().currentUser.uid;
	var ref = firebase.database().ref( 'users/' ).child( uid ).child('groups');
	let groups = [];
	console.log('FETCHING USER GROUPS');
	console.log(uid);
	return ( dispatch, getState ) => {
		return new Promise ((resolve, reject) => {
			ref.on('value', function(snapshot){
				let groupsObj = snapshot.val();
				for(var group in groupsObj){
					groups.push( group );
				}
				dispatch( addGroupsAction(groups) );
				dispatch( addGroupsMeta(groups) );
			})
			resolve();
		}) 
	}
}

export function groupsUsers( groups ) {
	return dispatch => {
		var reads = [];
		var ref = firebase.database().ref( 'groups/' )
		groups.forEach( function( groupId ) {

			var promise = ref.child( groupId ).child('users').once('value').then(function(snap) {
				// The Promise was fulfilled.
				return snap.val()
			}, function(error) {
				// The Promise was rejected.
				console.error(error);
			});
			reads.push(promise);
		});

		return Promise.all( reads );
	}
}