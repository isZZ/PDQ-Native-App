import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import NavButton from './NavButton'
import LoginButton from './LoginButton'

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
const LoginScreen = (props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login Screen</Text>
			<NavButton destLabel="Second" buttonHandler={props.onButtonPress} />
			<LoginButton loginLabel="Facebook Login" />
		</View>
	)
}

LoginScreen.propTypes = {
	onButtonPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: { 
		flex: 1,
		backgroundColor: '#2F9CB2',
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

export default LoginScreen