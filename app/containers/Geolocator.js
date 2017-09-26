import React, { Component } from 'react';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { View} from 'react-native';
import { geolocationUpdate } from '../actions/geolocation.js'
import { connect } from 'react-redux'

class Geolocator extends Component {

  constructor(props) {
    super(props);
  }


  componentWillMount() {

    //let { locationUpdate } = this.props;
    //currentLocation = this.currentLocation;

    // BackgroundGeolocation.configure({
    //   desiredAccuracy: 10,
    //   stationaryRadius: 2,
    //   distanceFilter: 50,
    //   locationTimeout: 30,
    //   notificationTitle: 'Background tracking',
    //   notificationText: 'enabled',
    //   debug: false,
    //   startOnBoot: true,
    //   stopOnTerminate: false,
    //   locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
    //   interval: 10000,
    //   fastestInterval: 5000,
    //   activitiesInterval: 10000,
    //   stopOnStillActivity: true,
    // });
    
    // BackgroundGeolocation.on('location', ( location ) => {
    //   //handle your locations here
    //   //location.locationStationary = false;
    //   //locationUpdate( location );
    // });

    // BackgroundGeolocation.on('stationary', ( stationaryLocation ) => {
    //   //handle stationary locations here
    //   //stationaryLocation.locationStationary = true;
    //   //stationaryLocation.time = Date.now();
    //   //locationUpdate( stationaryLocation );
    // });

    // BackgroundGeolocation.on('error', (error) => {
    //   console.log('[ERROR] BackgroundGeolocation error:', error);
    // });

    // BackgroundGeolocation.start(() => {
    //   console.log('[DEBUG] BackgroundGeolocation started successfully');    
    // });

  }

  render(){
    return(
      <View></View>
    );
  }

}

export default connect(
  null,
  dispatch => ({
    locationUpdate: ( location ) => {
        dispatch( geolocationUpdate( location ) )
    }
  })
)( Geolocator )
