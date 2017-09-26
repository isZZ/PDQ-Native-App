import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, ToastAndroid, Image, TouchableOpacity} from 'react-native'
import {Grid, Row} from 'react-native-elements';
import NavButton from './NavButton'
import Button from './Button'
import AuthForm from './AuthForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'
import KeyboardSpacer from 'react-native-keyboard-spacer';


//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
const ScreenLogin = (props) => {
	return (
		<View style={{flex:1}}>
			<Grid containerStyle={ styles.body }>
				<Row size={1} containerStyle={ styles.logoContainer }>
					<Image source={require('./../images/logo.png')} style={styles.logo} />
				</Row>
				<Row size={3}>
					<AuthForm { ...props } style={styles.form}  />
				</Row>
			</Grid>
			{props.isFetching && <Spinner />}
		</View>
	)
}

ScreenLogin.propTypes = {
	gotoSubscribe: PropTypes.func.isRequired,
	gotoPasswordRecovery: PropTypes.func.isRequired,
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
});

export default ScreenLogin