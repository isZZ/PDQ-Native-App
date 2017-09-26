import React, {PropTypes, Component} from 'react'
import {View, StyleSheet, TextInput, ToastAndroid, Image, ScrollView} from 'react-native'
import {Grid, Row, Text} from 'react-native-elements';
import NavButton from './NavButton'
import Button from './Button'
import UserForm from './UserForm'
import Spinner from '../components/Spinner.js'
import Overlay from '../components/Overlay.js'
import KeyboardSpacer from 'react-native-keyboard-spacer';

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 
const ScreenSubscribeProfile = (props) => {
	return (
		<View style={{flex:1}}>
			<Grid containerStyle={ styles.body }>
				<Row size={1} containerStyle={ styles.textHeader }>
					<View style={ styles.center }>
						<View style={ styles.textContainer }>
							<Text h3 style={ styles.title }>YOUR PROFILE</Text>
						 	<Text style={ styles.paragraph }>We just need a tiny bit more information to create your user.</Text>
					 	</View>
				 	</View>
				</Row>
				<Row size={3}>
					<UserForm { ...props } style={ styles.form } />
				</Row>
			</Grid>
			{props.isFetching && <Spinner />}
		</View>
	)
}

ScreenSubscribeProfile.propTypes = {

}

const styles = StyleSheet.create({
	center:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
		backgroundColor:'#212121',
	},
	body:{
		backgroundColor:'#212121',
		flex:1,
	},
	textHeader:{
		flex:1,
	},
	textContainer:{
		flex:1,
		paddingRight:10,
		paddingLeft:10,
		width:300,
		padding:20,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontFamily:'Roboto',
		fontSize: 20,
		fontWeight: '400',
		color: '#1D7872',
		marginBottom: 20,
		alignSelf: 'stretch',
		textAlign: 'center',
		color:'#757575',
	},
	paragraph:{
		fontFamily:'Roboto',
		fontSize: 14,
		textAlign:'center',
		color:'#1D7872',
		marginBottom: 10,
		fontWeight:'300',
		lineHeight: 26,
		color:'#757575',
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
})

export default ScreenSubscribeProfile