import * as firebase from 'firebase';
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import {navigatePush} from '../actions/navigation';
import {Actions} from 'react-native-router-flux'
import {fetchGroups} from '../actions/groups'
import {startGeolLocation, stopGeolLocation} from '../actions/geolocation'
import {configurePushNotifications} from '../actions/notifications'

// *** Action Types ***
export const FETCHING_AUTH = 'FETCHING_AUTH'
export const LOGIN_AUTH = 'LOGIN_AUTH'
export const LOGOUT_AUTH = 'LOGOUT_AUTH'
export const ERROR_AUTH = 'ERROR_AUTH'

// *** Action Creators ***
// The following action creators were derived from AuthReducer
export function authFetching() {
	return {
		type: FETCHING_AUTH,
	}
}

export function authLogin( uid ) {
	return {
		type: LOGIN_AUTH,
		uid
	} 
}

export function authLogout() {
	return {
		type: LOGOUT_AUTH,
	}
}

export function authError( error ) {
	return { 
		type: ERROR_AUTH,
		error: error
	}
}

export function authSignIn( creds ) {
  return dispatch => {
  		dispatch( authFetching() );
		firebase.auth().signInWithEmailAndPassword( creds.email, creds.password )
		.then( ( user ) => {
			dispatch( onLogin(user) );
		})
		.catch( (error) => {
			var message;
			switch( error.code ){
				case "auth/wrong-password":
            		message = 'Sorry that was an invalid password, please try again';
      			break;
	            case "auth/invalid-email":
	            	message = 'Sorry a user with that email does not exist, please try again'; 
	            break;
		        case "auth/user-not-found":
		        	message = 'Sorry a user with that username does not exist, please try again';
		        break;
		        case "auth/network-request-failed":
		        	message = 'A network error occured when trying to contact the server';
		        default:
		        	message = 'An error occured when logging in the user';
		        break; 
			} 
			ToastAndroid.show( message , ToastAndroid.LONG );
			dispatch( authError({
				'code': error.code, 
				'message' : message
			}) );
		});
  };
}

export function onLogin(user){
	console.log('Logging in');
	console.log(user.uid);
	return dispatch => {
		var uid = user.uid;
		dispatch( authLogin( uid ) );
		try{
			firebase.database().ref('users/').child(uid).child('profile/username').once( 'value', function(snapshot){
				if( snapshot.exists() ){
					dispatch(createListeners()).then(
						()=>Actions.main({type: 'reset'})
					);
				}else{
					dispatch(createListeners()).then(()=>{
						Actions.login({type: 'reset'});
						Actions.sceneSubscribeProfile({type: 'reset'});
					})
				}
			});	
		}catch(error){
			console.warn(error);
		}
	}
}

export function onLogout(user){
	return dispatch => {
		firebase.auth().signOut().then(function() {
			if(__DEV__){
  				console.log('Signed Out');
  			}
		}, function(error) {
			if(__DEV__){
				console.error('Sign Out Error', error);
			}
		});
	}
}

export function createListeners(){
	return dispatch => {
		return dispatch(fetchGroups());
	}
}

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });

export function authSignInWithToken() {

	return dispatch => {
		firebase.auth().onAuthStateChanged(function(user){
			if (user) {
				console.log('Token Signed In');
				console.log(user);
  				dispatch( onLogin(user) );
  			}else{
  				Actions.login({type:'reset'});
  			}
			// user.getToken().then((token)=>{
			// 	console.log('USER TOKEN');
			// 	console.log(token);
			// })
		});
  			// if (user) {
  			// 	dispatch( onLogin(user) );
  			// }else{

  			// }


		// firebase.auth().onAuthStateChanged(function(user) {
		// 	if (user) {
		// 		user.getToken().then(function(data) {
		// 			console.log('token data')
  //     				console.log(data)
  //   			});


		// 		//dispatch( onLogin(user) );
		// 		// user.getToken().then(function(token) {
		// 		// 	firebase.auth().signInWithCustomToken(token).then(function(){
		// 		// 		console.log('SIGNED IN WITH TOKEN')
		// 		// 	})
		// 		// // 	console.log('TOKEN');
		// 		// // 	console.log(typeof(token));
		// 		// // 	firebase.auth().signInWithCustomToken(token)
		// 		// // 	.catch(function(error) {
		// 		// // 		var errorMessage = error.message
		// 		// // 		if(__DEV__){
		// 		// // 			console.log('auth sign in error');
		// 		// // 			console.log(errorMessage);
		// 		// // 		}
		// 		// // 		Actions.login({type:'reset'});
		// 		// // 	})
		// 		// // 	.then(function(){
		// 		// // 		if(__DEV__){
		// 		// // 			console.log('logged in');
		// 		// // 		}
		// 		// // 		dispatch( onLogin(user) );
		// 		// // 	});
		// 		// // }).catch(function(error){
		// 		// // 	if(__DEV__){
		// 		// // 		console.log(error);
		// 		// // 		Actions.login({type:'reset'});
		// 		// // 	}
		// 		// });
		// 	}else{
		// 		Actions.login({type:'reset'});
		// 	}
		// });
	}




	//firebase.auth().currentUser.getToken().then(data => console.log(data))
	// firebase.auth().signInWithCustomToken(token).catch(function(error) {
	// // Handle Errors here.
	// 	var errorCode = error.code;
	// 	var errorMessage = error.message;
	// 	if (errorCode === 'auth/invalid-custom-token') {
	// 		alert('The token you provided is not valid.');
	// 	} else {
	// 		console.error(error);
	// 	}
	// });
}

// export function addAuthTokenListener(){
// 	// firebase.auth().addAuthTokenListener(user).then((user)=>{
// 	// 	if (user != null) {
//  //            // User is signed in
//  //            console.log("onAuthStateChanged:signed_in:" + user.getUid());
//  //        }else{
//  //            // User is signed out
//  //            console.log("onAuthStateChanged:signed_out");
//  //        }

// 	// })
// }

export function addAuthTokenListener(){
	return (dispatch, getState) => {
		return firebase.auth().onAuthStateChanged(function(user) {
		    if (user) {
		        // User is signed in
		        var email = user.email;
		        if(__DEV__){
		        	console.log('User is signed in');
		    	}
		        dispatch(configurePushNotifications());
		        dispatch(startGeolLocation());
		        // ...
		    } else {
		        // User is not signed in
		        // ...
		        if(__DEV__){
		        	console.log('User is not signed in');
	        	}
		         dispatch(stopGeolLocation());
		    }
		});




		// let state = getState();
		// firebase.auth().onAuthStateChanged(function(user) {
		//   if (user) {
		//     // User is signed in.
		//     var isAnonymous = user.isAnonymous;
		//     var uid = user.uid;
		//     console.log('user is signed in')
		//     // ...
		//   } else {
		//     // User is signed out.
		//     // ...
		//     console.log('userstate')
		//   }
		//   // ...
		// });
	}
}