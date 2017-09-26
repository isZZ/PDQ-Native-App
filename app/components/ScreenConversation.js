import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Platform, Dimensions} from 'react-native';
import { GiftedChat } from './giftedchat/GiftedChat';
import { GalleryImagePicker } from './GalleryImagePicker';
import { CameraImagePicker } from './CameraImagePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Lightbox from 'react-native-lightbox';
import _ from 'lodash'


export class ScreenConversation extends Component {

	constructor(props) {
		super(props); 
		//this.state = {messages: []};
		this.renderSend = this.renderSend.bind( this );
		this.uploadAction = this._uploadAction.bind( this );
		//this.showImagePicker = this.showImagePicker.bind( this );
		//this.sip = showImagePicker
		//this.renderActions = this.renderActions.bind(this)

		this.state = { 
			openGalleryImagePicker: false,
			openCameraImagePicker: false,
			messages: [
				{
					_id: 1, 
					text: 'Hello developer',
					createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
					user: {
						_id: 2,
						name: 'React Native',  
						avatar: 'https://facebook.github.io/react/img/logo_og.png',
					}, 
				}, 
			],
		} 

	}    

	onSend( message ) {
		let conversationId = this.props.conversationId;
		this.props.onMessageSend(message, conversationId);
	}
 
	// onSend(messages = []) {

	//   // this.setState((previousState) => {
	//   //   return {
	//   //     messages: GiftedChat.append(previousState.messages, messages),
	//   //   };  
	//   // });
	// }

	_showImagePicker(){
		ImagePicker.openPicker({
			cropping: false,
			cropperCircleOverlay: false,
			compressImageMaxWidth:1500,
			compressImageMaxHeight:1500,
			compressImageQuality:0.7
		}).then(image => {
			this._selectImagePicker( image )
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
		});
	}


	_showCameraPicker(){
		ImagePicker.openCamera({
			cropping: false,
			cropperCircleOverlay: false,
			compressImageMaxWidth:1500,
			compressImageMaxHeight:1500,
			compressImageQuality:0.7
		}).then(image => {
			this._selectImagePicker( image )
		});
	}




	// _showImagePicker(){
	//   this.setState({ openGalleryImagePicker: true });
	//   console.debug('SHOWS THE IMAGE PICKER'); 
	// }

	 _cancelImagePicker(){
		this.setState({ openGalleryImagePicker: false });
	}

	_selectImagePicker( image ){
		this.props.onImageSelect( image )
	}

	// _showCameraPicker(){
	//   this.setState({ openCameraImagePicker: true });
	//   console.debug('SHOW IMAGE PICKER');
	// }

	 _cancelCameraPicker(){
		this.setState({ openCameraImagePicker: false });
	}  

	_selectCameraPicker( response ){
		this.setState({ openCameraImagePicker: false });
		this.props.onImageSelect( response )
	}



	_uploadAction( source ){ 
 
	}

	renderActions( ){  
		return(
			<View style={ [styles.actions] }>
				<TouchableOpacity onPress={ _.debounce(() => this._showImagePicker(), 800) } style={ styles.actionContainer }>
					<View>
						<Icon name="image" size={25} color="#03A9F4" />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={ _.debounce(() => this._showCameraPicker(), 800) } style={ styles.actionContainer }>
					<View>
						<Icon name="camera" size={25} color="#03A9F4" />
					</View>
				</TouchableOpacity>
			</View> 
		)
	}

	renderSend(props){
		let disabled = !props.text.length?true:false;
		return(
			<View style={ styles.send }>
					<TouchableOpacity onPress={() => {
						props.onSend({text: props.text.trim()}, true)
						}}
						disabled={ disabled }
						style={ styles.sendContainer }
					>
						<Icon name="paper-plane" size={25} color="#0288D1" />
					</TouchableOpacity>
			</View>  
		)
	} 

	render(){
		let { conversationId, conversationUserIds, onversationUserRoles, userProfiles, messages, uid } = this.props
		return(
			<View style={ [styles.container] }>
				<GiftedChat

					messages={ messages }
					onSend={ (messages) => this.onSend( messages ) }
					user={{
						_id: uid,
					}}

					renderMessageImage={
						(props) => {
							const { height, width} = Dimensions.get('window'); 
							const activeProps = { resizeMode: 'contain', flex: 1, height, width, alignSelf:'center' };

							return(
								<View style={[props.containerStyle]}>
									<Lightbox underlayColor="white" navigator={this.props.navigator} activeProps={activeProps}>
										<Image
											style={[styles.image, props.imageStyle]}
											source={{uri: props.currentMessage.image}}
										/>
									</Lightbox>
								</View>
						  	)
					  	}
					}

					renderActions={
						() => this.renderActions()
					}
					renderSend={
							this.renderSend
					}
					containerStyle={
						styles.giftedContainer
					}
				/>
				<GalleryImagePicker  uploadAction={ this._selectImagePicker.bind(this) } showImagePicker={ this.state.openGalleryImagePicker } onCancelImagePicker={ this._cancelImagePicker.bind( this ) } />
				<CameraImagePicker uploadAction={ this._selectCameraPicker.bind(this) } showImagePicker={ this.state.openCameraImagePicker } onCancelImagePicker={ this._cancelCameraPicker.bind( this ) } />
			</View>
		) 
	}

}

const styles =  StyleSheet.create({
	container:{
		flex: 1,
		marginTop: 52,
		marginBottom: 0,
		paddingBottom:0

	},
	giftedContainer:{
		bottom:5,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0,0,0, .4)',
				shadowOffset: {height: 1, width: 1},
				shadowOpacity: 1,
				shadowRadius: 1
			},
			android: {
				elevation: 1
			}
	    })
	},
	cameraRollPicker:{
		flex:1,
		backgroundColor:'blue'
	},
	actions:{
		flex:.4,
		flexDirection:'row',
		justifyContent:'flex-start',
		alignSelf:'center',
		paddingLeft:10
	},
	actionContainer:{
		marginLeft:5,
		marginRight:5,
	},
	send:{
		flex:.3,
		flexDirection:'row',
		justifyContent:'flex-end',
		alignSelf:'center',
		paddingRight:10
	},
	sendContainer:{
		marginLeft:5,
		marginRight:5,
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
	image: {
	    width: 150,
	    height: 100,
	    borderRadius: 13,
	    margin: 3,
	    resizeMode: 'cover',
  	},
	raised: {
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0,0,0, .4)',
				shadowOffset: {height: 1, width: 1},
				shadowOpacity: 1,
				shadowRadius: 1
			},
			android: {
				elevation: 2
			}
			})
	},
});

export default ScreenConversation