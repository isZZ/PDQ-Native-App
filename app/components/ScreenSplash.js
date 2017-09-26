import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, ToastAndroid, Image, TouchableOpacity} from 'react-native'
import {Grid, Row} from 'react-native-elements';
import NavButton from './NavButton'
import Button from './Button'
import AuthForm from './AuthForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'
import Geolocator from '../containers/Geolocator.js'


//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
class ScreenSplash extends Component{

	constructor(props){
		super(props)
	}

	componentDidMount(){
		let{authSignInWithToken} = this.props;
		authSignInWithToken();
	}

	render(){
		let props = this.props; 
		return(
			<Grid containerStyle={ styles.body }>
  				<Row size={2} containerStyle={ styles.logoContainer }>
  					<Image source={require('./../images/logo.png')} style={styles.logo} />
  				</Row>
  				<Row size={1} style={styles.logoTextContainer}>
  					<Image source={require('./../images/logoText.png')}  resizeMode="contain" style={styles.logoText} />
  				</Row>
			</Grid> 
		)
	}
}

const styles = StyleSheet.create({
	body:{
		backgroundColor:'#212121'
	},
	backgroundImage: {
		flex: 1,
		// remove width and height to override fixed static size
		width: null,
		height: null,
		backgroundColor: '#1A212C',
	},
	logo:{
		width:160,
		height:170 
	},
	logoText:{
		width:80,
		height:100
	},
	logoContainer:{
		justifyContent: 'center',
		alignItems: 'center'
	}, 
	logoTextContainer:{
		justifyContent: 'center',
		alignItems: 'center'
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
	text:{
		color:'blue'
	}
})

export default ScreenSplash