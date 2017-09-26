import React, { Component } from 'react';
import { Text, StyleSheet, View, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ToolTip extends Component{

	constructor( props ){
		super(props);
		this.state = {
			opacity: new Animated.Value(0), 
		};
		console.log("INHERITED STYLES"+this.props.style)
	}

	render() {

		var { messages } = this.props;

	    return (
			<Animated.View style={ [styles.toolTip, { opacity: this.state.opacity }] }>
				
				<Icon name='caret-up' size={25} color="white" style={ styles.arrow } />
	    		<View style={ styles.bubble }>
	      			{ this.props.messages.map(( message, index ) => (
						<Text style={ styles.messages } key={ index }>{ message }</Text>
					))}
	  			</View>
			</Animated.View>
	    );
    }

    componentDidMount() {
    	Animated.timing(
			this.state.opacity,  
				{ 
					toValue: 1.0, 
					duration: 400, 
					easing: Easing.inOut(Easing.quad) 
				},
		).start();  // Start the animation
	}

}

const styles = StyleSheet.create({
	toolTip: {
		position:'absolute',
		zIndex:100,
		top:70,
		left:0,
		right:0,
		paddingTop:10,
		elevation:300,
		shadowOpacity:1.0
	},
	bubble: {
		backgroundColor: '#FC5773',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		left:0,
		right:0,
		marginTop:0,
		marginLeft:20,
		marginRight:20,
		padding:10,
		overflow: 'visible',
	},
	messages: {
		fontSize: 12
	},
	label: {
		color: 'white',
		textAlign: 'center'
	},
	arrow:{
		position: 'absolute',
		top:-7,
		right:40,
		color:'#FC5773'

	},
	boxOpen: {
		height:20,
		width:20,
		backgroundColor:'blue'
	},
	boxClosed: {
		height:20,
		width:20,
		backgroundColor:'red'
	}
})