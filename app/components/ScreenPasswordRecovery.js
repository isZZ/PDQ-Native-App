import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, ToastAndroid, Image, TouchableOpacity, ScrollView} from 'react-native'
import NavButton from './NavButton'
import Button from './Button'
import PasswordResetForm from './PasswordResetForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'
import {Grid, Row} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 

const ScenePasswordRecovery = ( props ) => {
	return (
		<View style={{flex:1}}>
			<Grid containerStyle={ styles.body }>
				<Row size={1} containerStyle={ styles.logoContainer }>
					<Image source={require('./../images/logo.png')} style={styles.logo} />
				</Row>
				<Row size={3}>
					<PasswordResetForm { ...props } style={ styles.form } />
				</Row>
			</Grid>
			{props.isFetching && <Spinner />}
		</View>

	)
}
// FirstScreen.state = {
	
// }

ScenePasswordRecovery.propTypes = {
	
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
		alignItems: 'center',
        flexDirection: 'column',
	},
	title: {
		fontFamily:'Roboto',
		fontSize: 30,
		fontWeight: '400',
		color: '#1D7872',
		marginBottom: 30,
		textAlign:'center',
		width: 300,
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
		width: 300,
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

export default ScenePasswordRecovery