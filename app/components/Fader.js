import React, { Component, PropTypes } from 'react';
import { Animated, View } from 'react-native';

export class Fader extends Component {

	constructor( props ){
		super(props);
		this.state = { 
			fadeAnim: new Animated.Value( 0 ), // init opacity 0
		};
	}

	componentDidMount() {
	 	Animated.timing(  // Uses easing functions
			this.state.fadeAnim,  // The value to drive
			{toValue: 1}  // Configuration
		).start();  // Don't forget start!
	}

	render() {
		return ( 
			<Animated.View style={{opacity: this.state.fadeAnim}}>
				{this.props.children}
			</Animated.View>
			);
	}

}