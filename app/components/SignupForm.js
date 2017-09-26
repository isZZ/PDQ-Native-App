import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class SignupForm extends Component {
	signup(){
		var creds = {
			email: this.props.email,
			password: this.props.password,
		}
		this.props.onSubscribeButtonPress( creds )
	}
	validate(){
		var creds = {
			email: this.props.email,
			password: this.props.password,
		}
		this.props.signupValidate( creds )
	}
	render(){
		let props = this.props;
		let disabledButton = props.isFetching ? styles.buttonDisabled : styles.buttonNormal
		return(
			<View style={styles.center}>
				<View style={styles.formContainer}>
					<FormTextInput
						placeholder='Your Email'
						secureTextEntry={ false }
						onChangeText={ this.props.onEmailChange }
						toolTip={ this.props.emailErrorMessages }
						icon='user'
						labelText='Email'
						value={props.email}
					/>
					<FormTextInput
						placeholder='Your Password'
						secureTextEntry={ false }
						onChangeText={ this.props.onPasswordChange }
						toolTip={ this.props.passwordErrorMessages }
						icon='lock'
						labelText='Password'
						value={props.password}
					/>
					<Button
						raised
						icon={{name: 'touch-app'}}
						title='SUBSCRIBE'
						backgroundColor='#0288D1'
						buttonStyle={styles.button}
						disabledStyle={styles.disabledButton}
						onPress={this.signup.bind( this )}
						disabled={props.isFetching}
					/>
					<TouchableOpacity onPress={ () => props.gotoLogin() } >
						<View>
							<Text style={styles.signup}>Allready a subscriber? Login here</Text>
						</View>
					</TouchableOpacity>
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

