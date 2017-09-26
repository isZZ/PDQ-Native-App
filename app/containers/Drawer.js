import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native';

// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class Drawer extends React.Component {

  render() { 
	var navigationView = ( 
		<View style={{flex: 1, backgroundColor: '#fff'}}>
			<Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
		</View>
	);

	return (
		<DrawerLayoutAndroid
			drawerWidth={300}
			drawerPosition={DrawerLayoutAndroid.positions.Left}
			renderNavigationView={() => navigationView}>
			<View style={{flex: 1, alignItems: 'center'}}>
				<Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
				<Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
			</View>
		</DrawerLayoutAndroid> 
	);
}	
}

const styles =  StyleSheet.create({
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
});