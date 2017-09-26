import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, Image, ToastAndroid, TouchableOpacity} from 'react-native'
import {Grid, Row} from 'react-native-elements';
import NavButton from './NavButton'
import Button from './Button'
import SignupForm from './SignupForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'
import KeyboardSpacer from 'react-native-keyboard-spacer';

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
const ScreenSubscribe = (props) => {
	return (
		<View style={{flex:1}}>
			<Grid containerStyle={ styles.body }>
				<Row size={1} containerStyle={ styles.logoContainer }>
					<Image source={require('./../images/logo.png')} style={styles.logo} />
				</Row>
				<Row size={3}>
					<SignupForm { ...props } style={ styles.form } />
				</Row>
			</Grid>
			{props.isFetching && <Spinner />}
		</View>
	)
}

// FirstScreen.state = {
	
// }

ScreenSubscribe.propTypes = {

}

const styles = StyleSheet.create({
	backgroundImage: {
	    flex: 1,
	    // remove width and height to override fixed static size
	    width: null,
	    height: null,
		backgroundColor: '#1A212C',
  	},
  	body:{
  		backgroundColor:'#212121'
  	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontFamily:'Roboto',
		fontSize: 30,
		fontWeight: '400',
		color: '#1D7872',
		marginBottom: 30,
		textAlign:'center'
	},
	paragraph:{
		fontFamily:'Roboto',
		fontSize: 18,
		textAlign:'center',
		color:'#1D7872',
		marginBottom: 10,
		fontWeight:'300',
		paddingRight:10,
		paddingLeft:10,
	},
	smallParagraph:{
		fontFamily:'Roboto',
		fontSize: 14,
		textAlign:'center',
		color:'#1D7872',
		marginBottom: 10
	},
	form:{
		marginBottom: 10
	},
	logo:{
		width:80,
		height:80 
	},
	logoContainer:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default ScreenSubscribe