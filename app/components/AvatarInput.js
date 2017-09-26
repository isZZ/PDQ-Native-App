/*
**  This component will be published in a separate package
*/
import React from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	StyleSheet,
	Button,
	CameraRoll,
	Animated,
	Easing
} from 'react-native';

import { FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class AvatarInput extends React.Component {
	constructor( props ){
		super( props )
		this.state = {
			pickerOpen: false,
			image:null,
			error:false
		};
		this._onOpenPicker = this._onOpenPicker.bind(this);
		this._onOpenCamera = this._onOpenCamera.bind(this);
	}     

	render() {

		let avatarImage, toolTip;
		
		if( this.state.image ){
			avatarImage = <Image style={styles.avatar} source={ { uri :this.state.image.uri } } />
		}else{
			avatarImage = <Icon name="person" size={ 75 } color="#03A9F4" /> 
		}

		if( this.props.errorMessages.length > 0 ){
			toolTip = this.toolTip( this.props.errorMessages );
		}

		return (
			<View>
				<View style={ styles.container }>
					<View style={styles.selectAvatar}>
						{ avatarImage }
					</View>
					<TouchableHighlight onPress={this._onOpenPicker} style={ [styles.circleButton, styles.cameraButton] } >
						<View>
							<Icon name="camera-roll"  size={ 25 } color="#1A212C" />
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={this._onOpenCamera} style={ [styles.circleButton, styles.pickerButton] }>
						<View>
							<Icon name="camera-front"  size={ 25 } color="#1A212C" />
						</View>
					</TouchableHighlight>
					{toolTip}
				</View>
			</View>
		);
	}

	imageChange( image ){
		this.props.onImageChange( image )
	}

	toolTip( messages ){
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		return(
				<FormValidationMessage containerStyle={styles.containerStyle} labelStyle={styles.errorStyle}>{capitalizeFirstLetter(messages[0])}</FormValidationMessage>
		)
	}

	_onOpenPicker(){
		ImagePicker.openPicker({
				width: 300,
				height: 400,
				cropping: true,
				cropperCircleOverlay: true,
				compressImageMaxWidth:500,
				compressImageMaxHeight:500,
				compressImageQuality:0.7
		}).then(image => {
				this.imageChange( image );
				this.setState({
					image: {
						uri: image.path,
						width: image.width,
						height: image.height,
						mime: image.mime
					}
				})
				// CameraRoll.getPhotos({first: 1}).then((data) => {
				//   console.log(data);
				//   this.setState({image:image.path});
				//   // this.setState({
				//   //   image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
				//   // });
				//   //this.state.dataSource.cloneWithRows(data.edges);
				//   //this.setState({image:image.path});
				// }).catch((e) => {
				//   console.log(e);
				// });
				//this.setState({image:image.path});
		}).catch(function(error) {
			if(__DEV__){
				console.log( error );
			}
		});
	}

	_onOpenCamera(){
		ImagePicker.openCamera({
				width: 300,
				height: 400,
				cropping: true,
				cropperCircleOverlay: true,
				compressImageMaxWidth:1000,
				compressImageMaxHeight:1000,
				compressImageQuality:0.7
		}).then(image => {
				CameraRoll.getPhotos({first: 1}).then((data) => {
					this.imageChange( image );
					this.setState({
						image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
					});
					// this.state.dataSource.cloneWithRows(data.edges);
					// this.setState({image:image.path});
				}).catch((e) => {
					if(__DEV__){
						console.log(e);
					}
			});
		}).catch(function(error) {
			if(__DEV__){
				console.log( error );
			}
		});
	}

}

const styles =  StyleSheet.create({
	container:{
		
	},
	circleButton:{
		borderWidth:1,
		backgroundColor:'#03A9F4',
		borderRadius:20,
		width:40,
		height:40,
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	cameraButton:{
		position:'absolute',
		top:10,
		right:60,
	},
	pickerButton:{
		position:'absolute',
			top:10,
			left:60
	},
	selectAvatar:{
		width:150,
		height:150,
		marginLeft:75,
		marginRight:75,
		borderRadius:75,
		borderColor:'#03A9F4',
		borderWidth:2,
		justifyContent:'center',
		alignItems:'center',
	},
	avatar:{
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 150,
		borderRadius: 75,
	},
	toolTip: {
		position:'absolute',
		zIndex:200,
		left:25,
		right:0,
		paddingTop:10,
		elevation:300,
		shadowOpacity:1.0,
		top:140,
		width:250
	},
	bubble: {
		backgroundColor: '#FC5773',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		left:0,
		right:0,
		marginTop:0,
		marginLeft:20,
		marginRight:20,
		padding:10,
		overflow: 'visible',
	},
	messages: {
		fontSize: 12,
	},
	label: {
		color: 'white',
		textAlign: 'center'
	},
	arrow:{
		position: 'absolute',
		top:-7,
		right:118,
		color:'#FC5773',
	},
	boxOpen: {
		height:20,
		width:20,
		backgroundColor:'blue'
	},
	boxClosed: {
		height:20,
		width:20,
		backgroundColor:'red'
	},
	containerStyle:{
		marginLeft:0,
		paddingLeft:0
	},
	labelStyle:{
		marginLeft:0,
		paddingLeft:0,
		color:'#757575'
	},
	inputContainer:{
		backgroundColor:'#212121',

	},
	errorStyle:{
		marginLeft:0,
		paddingLeft:0,
		color:'#FF5252'
	},
	focused:{
		borderBottomColor: '#BDBDBD',
		color:'#BDBDBD'
	},
	blurred:{
	},
	labelFocused:{
		color:'#BDBDBD'
	},
	labelBlurred:{}

});