import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, ToastAndroid} from 'react-native'

import NavButton from './NavButton'
import Button from './Button'
import AuthForm from './AuthForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
const ScreenPasswordRecovery = (props) => {
	return (
		<View style={ styles.container }>
			 <View style={ styles.body }>
			 	<Text>Ok lets do the password recovery</Text>
			 </View>
		</View>
	)
}

// FirstScreen.state = {
	
// }

ScreenPasswordRecovery.propTypes = {
	onButtonPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#113340',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30
	}
})

export default ScreenPasswordRecovery