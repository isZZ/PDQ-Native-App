import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, ToastAndroid, TouchableHighlight, ScrollView, Platform} from 'react-native'
import { NavButton } from './NavButton'
import { Button } from './Button'
import { Label } from './Label'
import { Spinner } from '../components/Spinner.js'
import { Overlay } from '../components/Overlay.js'
import { Activities } from '../components/Activities.js'
import { ConversationTile } from '../components/ConversationTile.js'
import Icon from 'react-native-vector-icons/MaterialIcons';


//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 

class ScreenDashboard extends Component {

	constructor( props ){
		super( props );
	}

	componentWillMount(){
		let { updateConversations, fetchUserGroups } = this.props;
		updateConversations();
		fetchUserGroups();
	}

	render(props){
		let { conversations, gotoConversation, showCreateConversation, uid } = this.props;
		return(
			<View style={ styles.container }>
				 <View style={ styles.body }>
				 	<View style={ styles.conversations }>
					    <ScrollView>
							{conversations.map(function(conversation, i){
								 return (<ConversationTile key={ i } { ...conversation } touchAction={ gotoConversation } uid={ uid } />)
							})}
						</ScrollView>
					</View>
				 </View>
				 <TouchableHighlight style={ [styles.chatButton, styles.raised] } onPress={ showCreateConversation }>
				 	<View>
				 		<Icon style={ styles.chatIcon } name="chat" size={ 40 } color="#ffffff" />
			 		</View>
				 </TouchableHighlight>
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
		backgroundColor: '#f0efef',
		alignItems: 'center',
		paddingTop: 52,
	},
	body: {
		flex:1,
		flexDirection: 'row'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30
	},
	link: {
		color: '#cccccc'
	},
	chatButton:{
		flex:1,
		position:'absolute',
		bottom:50,
		right:50,
		backgroundColor: '#FF5252',
		height:80,
		width:80,
		borderRadius:40,
		alignItems:'center',
		justifyContent:'center'
	},
	chatIcon:{

	},
	conversations:{
		flex:1
	},
	raised: {
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0,0,0, .4)',
				shadowOffset: {height: 1, width: 1},
				shadowOpacity: 1,
				shadowRadius: 1
			},
			android: {
				elevation: 2
			}
	    })
	},

})

export default ScreenDashboard