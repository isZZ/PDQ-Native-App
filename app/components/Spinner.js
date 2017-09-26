'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

class Spinner extends Component {
	render() {
			return (
				<View style={styles.container}>
					<ActivityIndicator
						style={styles.centering}
						size='large'
						color='#1976D2'
					/>
				</View>
			);
		}
}

export default Spinner

const styles = StyleSheet.create({
	container: {
		position:'absolute',
		flex:1,
		top:0,
		left:0,
		bottom:0,
		right:0,
	},
	centering: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
	},
	gray: {
		backgroundColor: '#cccccc',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 8,
	},
});