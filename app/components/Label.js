'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class Label extends Component {
	render() {
      return (
  		<View>
			<Text style={ styles.title }> { this.props.text.toUpperCase() } </Text>
  		</View>
      );
    }
}

const styles = StyleSheet.create({
	title:{
    	fontFamily: 'Roboto',
    	fontSize: 15,
    	fontWeight:"600",
    	color:'#95989A',
    	marginBottom:10,
    	marginLeft:10,
    	marginRight:10,
    }
});