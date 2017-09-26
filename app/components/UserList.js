import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput } from 'react-native';
import Button from './Button'
import WithLabel from './WithLabel'
import UserTile from './UserTile'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'

export class UserList extends Component {

	_handleItemTouch(){
		let { conversationId, touchAction } = this.props;
		touchAction( conversationId )
	}

	render(){
		let props = this.props;
		let { userProfiles } = props;
		
		return(
			<View style={ styles.container }>
        		{ userProfiles.map( ( profile, key ) => <UserTile key={ key } profile={ profile } onUserButton={props.onUserButton}  /> ) }
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
    	flex:1,
		flexDirection: 'column',
      	borderTopColor: '#95989A',
      	borderTopWidth: 0.5,
    },
  })