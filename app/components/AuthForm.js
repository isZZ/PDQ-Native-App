import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
//import Button from './Button'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button } from 'react-native-elements'

export default class AuthForm extends Component {
	login(){
		var creds = {
			email: this.props.email,
			password: this.props.password
		}
		this.props.onLoginButtonPress( creds )
	}
	validate(){
		var creds = {
			email: this.props.email,
			password: this.props.password
		}
		this.props.loginValidate( creds )
	}

	render(){
		props = this.props;
		let disabledButton = props.isFetching ? styles.buttonDisabled : styles.buttonNormal
		return( 
				<View style={styles.center}>
					<View style={styles.formContainer}>
						<FormTextInput
							onChangeText={ this.props.onEmailChange }
							placeholder='Your Email'
							secureTextEntry={ false }
							toolTip={ this.props.emailErrorMessages }
							icon='envelope-o'
							labelText='Email'
							value={props.email}
						 />
						 <FormTextInput
						 	onChangeText={ this.props.onPasswordChange }
							placeholder='Your Password'
							secureTextEntry={ true }
							toolTip={ this.props.passwordErrorMessages }
							icon='lock'
							labelText='Password'
							value={props.password}
						 />
					 	<Button
							raised
							icon={{name: 'touch-app'}}
							title='LOGIN'
							backgroundColor='#0288D1'
							buttonStyle={styles.button}
							disabledStyle={styles.disabledButton}
							onPress={()=>this.login()}
							disable={props.isFetching}
						/>
						<TouchableOpacity onPress={ () => props.gotoSubscribe() } ><Text style={styles.signup}>No account yet? Create one</Text></TouchableOpacity>
						<TouchableOpacity onPress={ () => props.gotoPasswordRecovery() } ><Text style={styles.passwordRecovery}>Password Recovery</Text></TouchableOpacity>
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
