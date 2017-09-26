import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import AvatarInput from './AvatarInput'

export default class UserForm extends Component {

	constructor(props){
		super();
	}

	userDetails(){
		var creds = {
			username: this.props.username,
			imageData:this.props.imageData
		}
		this.props.onUpdateButtonPress( creds )
	}

	imageChange( image ){
		this.props.onImageChange( image )
	}

	// validate(){
	// 	var creds = {
	// 		username: this.props.username,
	// 		imageData:this.props.imageData
	// 	}
	// 	this.props.userDetailsValidate( creds )
	// }   

	render(){

		let props = this.props;
		let disabledButton = props.isFetching ? styles.buttonDisabled : styles.buttonNormal;
		return( 
			<View style={styles.center}>
				<View style={styles.formContainer}>
					<AvatarInput { ...props } onImageChange={ this.imageChange.bind( this ) } errorMessages={ props.imageDataErrorMessages } />
					<FormTextInput
						placeholder='Your Username'
						secureTextEntry={ false }
						onChangeText={ props.onUsernameChange }
						toolTip={ props.usernameErrorMessages }
						icon='user'
						labelText='Username'
						value={props.username}
					/>
					<Button
						raised
						icon={{name: 'touch-app'}}
						title='CREATE PROFILE'
						backgroundColor='#0288D1'
						buttonStyle={styles.button}
						disabledStyle={styles.disabledButton}
						onPress={ this.userDetails.bind( this ) }
						disabled={props.isFetching}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	input:{
		borderBottomColor: '#ffffff',
		marginLeft:0,
		paddingLeft:0,
		width:350,
		flex: 0,
		fontSize:18
	},
	formContainer:{
		width:300
	},
	center:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	containerStyle:{
		marginLeft:0,
		paddingLeft:0
	},
	labelStyle:{
		marginLeft:0,
		paddingLeft:0
	},
	button:{
		marginTop:60,
		marginLeft:0,
		marginRight:0,
		borderRadius:5
	},
	signup:{
		marginTop:40,
		color:'#757575',
		textAlign:'center'
	},
	passwordRecovery:{
		color:'#757575',
		textAlign:'center'
	},
	disabledButton:{
		backgroundColor:'#0070b6'
	},
	buttonNormal:{

	}
	
})