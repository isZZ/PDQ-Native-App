import React, {PropTypes, Component} from 'react'
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'

export default class LoginButton extends Component{
	let { loginLabel, buttonHandler } = this.props
	render() {
	    return (
	      	<TouchableOpacity style={styles.button} onPress={buttonHandler}>
	      		<View>
					<Text style={styles.label}>{loginLabel}</Text>
				</View>
			</TouchableOpacity>
	    );
    }
}

const styles = StyleSheet.create({
	button: {
		padding: 15,
		backgroundColor: '#FC5773',
		alignSelf: 'stretch'
	},
	label: {
		color: '#F4F4E9',
		textAlign: 'center'
	}
})