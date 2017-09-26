import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, ScrollView, Button} from 'react-native'
import GroupTile from './GroupTile'

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 


class ScreenChatOptions extends Component{

	constructor( props ){
		super( props )
	}

	render(){
		let{groups, selectGroup} = this.props;
		return(
			<View style={ styles.container }>
				<View style={ styles.body }>
					<ScrollView>
						{groups.map((x, i) =>
							<GroupTile key={i} {...x} selectGroup={selectGroup} />
						)}
				 	</ScrollView>
				</View>
			</View>
		)
	}
}

// FirstScreen.state = {
	
// }

// DashboardScreen.propTypes = {
// 	onButtonPress: PropTypes.func.isRequired
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	closeModalButton:{
		position:'absolute',
		top:10,
		right:10,
	},
	body:{
		flex: 1,
		alignSelf: 'stretch',
		marginTop:60,
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30,
		textAlign: 'center'
	},
	link: {
		color: '#cccccc'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30
	},
	buttonContainer:{
		position:'absolute',
		top:10,
		right:10,
	},
	button:{
    	backgroundColor:'#1D7872',
    	padding:20
	},
	buttonText:{
		fontFamily: 'Roboto',
    	fontSize: 16,
    	fontWeight:"600",
    	color:'#ffffff',
    	textAlign:'center'
	}
})

export default ScreenChatOptions