'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class Overlay extends Component {
	render() {
      return (
  		<View style={styles.overlay}>
			{ this.props.children }
  		</View>
      );
    }
}

export default Overlay

const styles = StyleSheet.create({
	overlay:{
		flex: 1,
		position:'absolute',
		top:0,
		left:0,
		right:0,
		bottom:0,
		backgroundColor:'#113340',
	}
});