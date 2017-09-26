import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class PasswordResetForm extends Component {
	
	submit(){
		var email = this.props.email;
		this.props.onSubmit( email );
	}

	renderResetState(){
		let props = this.props;
		let disabledButton = props.isFetching ? styles.buttonDisabled : styles.buttonNormal
		if( this.props.passwordReset.isReset ){
			return(
				<View>
					<Text style={styles.paragraph}>A password recovery email has been sent to { this.props.email }</Text>
				</View>
			)
		} else {
			return(
				<View>
					<FormTextInput
						labelText='Email'
						placeholder='Your Email'
						secureTextEntry={ false }
						onChangeText={ this.props.onEmailChange }
						toolTip={ this.props.errorMessages }
						icon='user'
					/>
					<Button
						raised
						icon={{name: 'touch-app'}}
						title='RECOVER'
						backgroundColor='#0288D1'
						buttonStyle={styles.button}
						disabledStyle={styles.disabledButton}
						onPress={()=>this.submit()}
						disabled={props.isFetching}
					/>
					<TouchableOpacity onPress={ () => this.props.gotoLogin() } ><Text style={styles.signup}>Recovered your password? Login here</Text></TouchableOpacity>
				</View>
			)
		}
			
	}

	render(){

		return(
			<View style={styles.center}>
				<View style={styles.formContainer}>
				{ this.renderResetState() }
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

	},
	title: {
		fontFamily:'Roboto',
		fontSize: 20,
		fontWeight: '400',
		color: '#1D7872',
		marginBottom: 20,
		alignSelf: 'stretch',
		textAlign: 'center',
		color:'#757575',
	},
	paragraph:{
		fontFamily:'Roboto',
		fontSize: 14,
		textAlign:'center',
		color:'#1D7872',
		marginBottom: 10,
		fontWeight:'300',
		lineHeight: 26,
		color:'#757575',
	},
	smallParagraph:{
		fontFamily:'Roboto',
		fontSize: 14,
		textAlign:'center',
		color:'#1D7872',
		marginBottom: 10
	},
})


