import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput } from 'react-native';
import Button from './Button'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import Time  from './Time'
import Avatar from './Avatar'
import GiftedAvatar from './giftedchat/GiftedAvatar.js'
import { getLocalState } from '../reducers'

export class Activity extends Component {

	render(){
		return(
			<View style={ styles.container }>
				{ this.type( this.props.activityType, this.props ) }
			</View>
		)
	}
	
	type( activityType, props ){
		switch( activityType ){
			case 'message':
				return <ActivityMessage { ...props } />
			default :
				return null
		}
	}

}

const ActivityMessage = ( props ) => {
	return (
		<View style={ styles.container }>
			<View style={ styles.avatar }><GiftedAvatar { ...props } avatarStyle={ styles.avatarStyle } /></View>
			<View style={ styles.message }><Text style={ styles.messageText }>It's a message</Text></View>
			<View style={ styles.date }><Time createdAt={ props.createdAt } /></View>
		</View>
	)
}



const styles = StyleSheet.create({
    container: {
	  flex: 1,
      backgroundColor:'#fff',
      alignSelf: 'stretch',
      flexDirection: 'row',
      borderBottomColor: '#95989A',
      borderBottomWidth: 0.5,
      borderTopColor: '#95989A',
      borderTopWidth: 0.5,
    },
    avatar:{
		flex:1,
		padding:10,
	},
	message:{
		flex:3,
		paddingTop:20,
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
	messageText:{
		fontSize: 12,
		color: '#4E4F50',
		fontWeight:"400",
		fontFamily:'roboto'
	}
  })