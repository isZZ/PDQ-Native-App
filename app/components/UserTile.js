import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput, Animated } from 'react-native';
import Button from './Button'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import Avatar from './Avatar'
import GiftedAvatar from './giftedchat/GiftedAvatar.js'
import { getLocalState } from '../reducers'

export default class UserTile extends Component {

	constructor(){
		super()
		
	}

	render(){
		let props = this.props;
		let { uid, username, avatar } = props.profile;
		let onUserButton = props.onUserButton;
		let { url } = avatar;
		let user = { 
		    name: username,
		    avatar: url,
  		}

		return(
			<TouchableHighlight onPress={ () => onUserButton( username, uid ) }>
				<View style={ styles.container }>
					<View style={ styles.avatar }>
						<GiftedAvatar user={ user } avatarStyle={ styles.avatarStyle } />
					</View>
					<View style={ styles.username }>
						<Text style={ styles.usernameText }>{ username }</Text>
					</View>
					<View style={ styles.action }>
						<Text style={ styles.actionText }>INVITE</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	_handleItemTouch(){
		let { conversationId, touchAction } = this.props;
		touchAction(conversationId)
	}
}

const styles = StyleSheet.create({
    container: {
	  flex: 1,
      backgroundColor:'#fff',
      alignSelf: 'stretch',
      flexDirection: 'row',
      borderBottomColor: '#95989A',
      borderBottomWidth: 0.5,
      minHeight:70
    },
    avatar:{
		flex:1,
		padding:10,
	},
	username:{
		flex:3,
		alignSelf:'center',
	},
	date:{
		flex:1,
		padding:10,
		paddingTop:5,
	},
	avatarStyle:{
		width: 60,
    	height: 60,
    	borderRadius: 30,
    	borderColor: '#95989A',
		borderWidth: 0.5,
	},
	usernameText:{
		fontFamily: 'Roboto',
    	fontSize: 15,
    	fontWeight:'400',
    	color: '#4E4F50',
	},
	action:{
		flex:1,
		alignSelf:'center',
	},
	actionText:{
		fontFamily: 'Roboto',
		fontSize: 15,
		fontWeight:'600',
		color: '#BDBDBD',
	}
  })