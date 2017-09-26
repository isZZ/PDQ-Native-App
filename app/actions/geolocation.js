import * as firebase from 'firebase';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

BackgroundGeolocation.configure({
	desiredAccuracy: 10,
	stationaryRadius: 2,
	distanceFilter: 50,
	locationTimeout: 30,
	notificationTitle: 'Background tracking',
	notificationText: 'enabled',
	debug: false,
	startOnBoot: true,
	stopOnTerminate: false,
	locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
	interval: 10000,
	fastestInterval: 5000,
	activitiesInterval: 10000,
	stopOnStillActivity: true,
});



// *** Action Types ***
export const GEOLOCATION_UPDATE = 'GEOLOCATION_UPDATE'

export function geolocationUpdate( location ) {
	return ( dispatch ) => {
		dispatch( { type:GEOLOCATION_UPDATE, location } );
		dispatch( geolocationWrite( location ) );
	};
};

export function geolocationWrite( location ){
	return ( dispatch, getState ) => {

		const { auth } = getState();
		let uid = auth.uid;
		//If a uid is set log the location
		if( uid ){

			//Log the stationary positions
			if(location.locationStationary == true){
				location._state = 'reverse_geocode';
				dispatch( addLocationToQueue( location ) ); 
			}
 
			let newPostKey = firebase.database().ref().child('userLocations').child( uid ).push().key;

			// Write the new post's data simultaneously in the posts list and the user's post list.
			let updates = {};
			location.time = Date.now();

			updates['/userLocations/' + uid + '/' + newPostKey] = location;

			//updates
			return firebase.database().ref().update( updates );

		}
	}
}

export function addLocationToQueue( locationData ){
	return ( dispatch, getState ) => {
		const { auth } = getState();
		let UID = auth.uid;

		var ref = firebase.database().ref();
		var locationTask = 'reverse_geocode_process';

		locationData.start_state = locationTask;
		locationData.UID = UID;

		var newPostKey = firebase.database().ref().child( 'queue' ).child( 'tasks' ).push().key;
		var updates = {};
  		updates[ '/queue/tasks/' + newPostKey ] = locationData;

		return firebase.database().ref().update( updates );

	}
}

export function startGeolLocation(){
	return ( dispatch, getState ) => {
		BackgroundGeolocation.start(() => {
			if(__DEV__){
				console.log('[DEBUG] BackgroundGeolocation started successfully');
			}
		});

		BackgroundGeolocation.on('location', ( location ) => {
			//handle your locations here
			location.locationStationary = false;
			dispatch(geolocationUpdate( location ));
		});

		BackgroundGeolocation.on('stationary', ( stationaryLocation ) => {
			//handle stationary locations here
			stationaryLocation.locationStationary = true;
			stationaryLocation.time = Date.now();
			dispatch(geolocationUpdate( stationaryLocation ));
		});



	}
}

export function stopGeolLocation(){
	return ( dispatch, getState ) => {
		BackgroundGeolocation.stop();
	}
}

