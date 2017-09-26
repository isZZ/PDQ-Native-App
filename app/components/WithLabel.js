import React, { Component, PropTypes } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

class WithLabel extends Component {
  
	render() {
	    return ( 
			<View style={styles.labelContainer}>
				<View style={styles.label}>
					<Text>{this.props.label}</Text>
				</View>
				{ this.props.children }
			</View>
		);
	}		
}

export default WithLabel;

var styles = StyleSheet.create({
	page: { 
		paddingBottom: 300,
	},
	default: {
		height: 26,
		borderWidth: 0.5,
		borderColor: '#0f0f0f',
		flex: 1,
		fontSize: 13,
		padding: 4
	},
	multiline: { 
		borderWidth: 0.5,
		borderColor: '#0f0f0f',
		flex: 1,
		fontSize: 13,
		height: 50,
		padding: 4,
		marginBottom: 4
	},
	multilineWithFontStyles: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 18,
		fontFamily: 'Cochin',
		height: 60
	},
	multilineChild: {
		width: 50,
		height: 40,
		position: 'absolute',
		right: 5,
		backgroundColor: 'red'
	},
	eventLabel: {
		margin: 3,
		fontSize: 12
	},
	labelContainer: {
		flexDirection: 'row',
		marginVertical: 2,
		flex: 1, },
	label: { 
		width: 115,
		alignItems: 'flex-end',
		marginRight: 10,
		paddingTop: 2
	},
	rewriteContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	remainder: {
		textAlign: 'right',
		width: 24
	}, 
	hashtag: {
		color: 'blue',
		fontWeight: 'bold'
	}
});
