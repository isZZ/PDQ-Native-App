import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export class CameraImagePicker extends Component {

	constructor(props) {
		super(props);
		//Default Options
		this.options = {
			storageOptions: {
				skipBackup: true,
				path: 'images',
				cameraRoll: true,
				waitUntilSaved: true,
			},
			cancelButtonTitle:true,
			mediaType:'photo',
			noData:true,
		};
	}

	showImagePicker(){

	}

	renderImagePicker(){
		let options = this.options
		ImagePicker.launchCamera(options, (response)  => {

			// Same code as in above section!
			if (response.didCancel) {
				this.props.onCancelImagePicker();
			}

			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}

			else { 
				this.props.uploadAction( response );
			}

	});
		// ImagePicker.showImagePicker(options, (response) => {
		//   console.log('Response = ', response);

				

		//   else if (response.customButton) {
		//     console.log('User tapped custom button: ', response.customButton);
		//   }
		//   else {
		//     let source;

		//     // You can display the image using either data...
		//     source = { uri: 'data:image/jpeg;base64,' + response.data };

		//     // Or a reference to the platform specific asset location
		//     if (Platform.OS === 'android') {
		//       source = { uri: response.uri };
		//     } else {
		//       source = { uri: response.uri.replace('file://', '') };
		//     }

		//     this.setState({
		//       avatarSource: source
		//     });
		//   }
		// });
	}

	render(){
		
		if(this.props.showImagePicker === true){
			this.renderImagePicker();
		}
		
		return null
	}

}

const styles =  StyleSheet.create({
	container:{
		marginTop:100,
		padding:20,
		flex: 1,
	},
	cameraRollPicker:{
		flex:1,
		backgroundColor:'blue'
	},
	avatarStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	textStyle: {
		color: '#fff',
		fontSize: 20,
		backgroundColor: 'transparent',
		fontWeight: '100',
		marginTop:0,
		color:'black',
		backgroundColor:'#cccccc',
		padding:20
	},
});