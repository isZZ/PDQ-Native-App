import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput } from 'react-native';
import Button from './Button'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'
import GiftedAvatar from './giftedchat/GiftedAvatar.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Time  from './Time'

export class ConversationTile extends Component {

	constructor(props){
		super(props)
		this._handleItemTouch = this._handleItemTouch.bind( this )
	}

	render(){

		let { conversationId, touchAction,  userProfile, createdAt, updatedAt, createdBy, latestMessage, users, uid } = this.props;
		let createdByProfile = ( createdBy && userProfile && users[createdBy]  )? userProfile[createdBy] : false;
		let latestContributorProfile = ( latestMessage && latestMessage.UID && userProfile && userProfile[latestMessage.UID] )? userProfile[createdBy] : false;
		let getCurrentProfile = function(){
			if( latestContributorProfile ){
				return latestContributorProfile
			}
			if( createdByProfile ){
				return createdByProfile
			}
			return false;
		}

		var currentProfile = getCurrentProfile();
		var user = null;

		if( currentProfile ){
			user = { name: currentProfile.username, avatar: currentProfile.avatar.url  }
		} 
		if( typeof(latestMessage) === 'object' ){
			let latestMessageProfile = userProfile[latestMessage.UID];
			if(typeof(latestMessageProfile) === 'object' && typeof(latestMessageProfile.username)==='string'&&typeof(latestMessageProfile.avatar)==='object'&&typeof(latestMessageProfile.avatar.url)==='string'){
				let setUserName = (latestMessage.UID == uid)?'Me':latestMessageProfile.username;
				user = { name: setUserName, avatar: latestMessageProfile.avatar.url  }
			}
		}

		let userNames = this._layoutNames( userProfile, uid );
		let latestUsername = (user && typeof(user.name)==='string')?user.name:'';

		if( latestMessage ){
			var latest = <LatestMessage message={ latestMessage.message } ownerName={ latestUsername } />
		}else{
			var latest = <Text style={styles.newConversation}>New conversation by { currentProfile.username }</Text>
		}

		return(
			<TouchableHighlight onPress={ () => this._handleItemTouch( conversationId, userNames.join(', ') ) }>
				<View style={ styles.container }>
					<View style={ styles.avatar }>
						{user && <GiftedAvatar user={ user } avatarStyle={ styles.avatarStyle } />}
					</View>
					<View style={ styles.centerColumn }>
						<View style={ styles.userTextContainer } ><Text style={ styles.usersText }>{ userNames.join(', ') }</Text></View>
						<View style={ styles.latestMessageContainer }>{ latest }</View>
					</View>
					<View style={ styles.update }>  
						<Time createdAt={ updatedAt } />
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	_layoutNames( userProfiles, uid ){
		userNames = [];
		for( let key in userProfiles ){
			let userProfile = userProfiles[key]
			if(userProfile.username){
				if( key == uid ){
					continue;
					//userProfile.username = 'Me'
				}
				userNames.push( userProfile.username )
			}
		}
		return userNames
	}

	_layoutAvatars( userProfiles ){
		for( let key in userProfiles ){
			let userProfile = userProfiles[key]
			if(userProfile.username){
				userNames.push( userProfile.username )
			}
		}
		return userNames
	}

	_handleItemTouch( conversationId, usernames ){
		this.props.touchAction( conversationId, usernames )
	}

}

function AVATAR( props ){

	let { uid } = props;
	return
	// if( typeof( uid ) == 'undefined' || typeof( props ) ){
	// 	return
	// }
}

function LatestMessage( props ) {

	let { message, ownerName } = props;
	let stringLength = 22;

		if( typeof message === 'undefined' ){
			return <Text style={styles.latestMessage}>New conversation created by { ownerName }</Text>;
		}

		if( message.length == 0 ){
			return <Icon name='camera' size={12} color="grey" style={ styles.iconCamera } />
		}

		message = ( message.length > stringLength )? message.slice( 0, stringLength-3 ) + '...' : message;
		message = ownerName + ': ' + message;

		return <Text style={styles.latestMessage}>{ message }</Text>
			 

}

const styles = StyleSheet.create({
    container: {
	  flex: 1,
      backgroundColor:'#fff',
      alignSelf: 'stretch',
      flexDirection: 'row',
      borderBottomColor: '#BDBDBD',
      borderBottomWidth: 0.5,
      minHeight:80,
    },
    centerColumn:{
    	flex:3,
		alignItems:'flex-start',
		justifyContent:'center'
    },
    iconCamera:{

    },
    userTextContainer:{
	
    },
    latestMessage:{

    },
    latestMessageContainer:{

    },
    latestMessage:{
		fontFamily: 'Roboto',
    	fontSize: 15,
    },
    avatar:{
		flex:1.2,
		padding:10,
	},
	username:{
		flex:3,
		alignSelf:'center',
	},
	update:{
		flex:1,
		alignItems:'flex-end',
		justifyContent:'center',
		padding:10,
	},
	date:{
		flex:1,
		padding:10,
	},
	avatarStyle:{
		width: 70,
    	height: 70,
    	borderRadius: 35,
    	borderColor: '#95989A',
		borderWidth: 0.5,
	},
	usersText:{
		fontFamily: 'Roboto',
    	fontSize: 15,
    	fontWeight:'400',
    	color: '#4E4F50',
	},
	updatedAtText:{
		fontFamily: 'Roboto',
    	fontSize: 15,
    	fontWeight:'400',
    	color: '#4E4F50',
	},
	lastMessageText:{
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
		color: '#71B095',
	}
})