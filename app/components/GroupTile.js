import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput } from 'react-native';
import Button from './Button'
import WithLabel from './WithLabel'
import FormTextInput from './FormTextInput'
import { getLocalState } from '../reducers'
import GiftedAvatar from './giftedchat/GiftedAvatar.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Time  from './Time'

class GroupTile extends Component {

	constructor(props){
		super(props)
		this._handleItemTouch = this._handleItemTouch.bind( this )
	}

	render(){
		let {groupId, description,name, createdAt } = this.props;
		return(
			<TouchableHighlight onPress={ () => this._handleItemTouch(  ) }>
				<View style={ styles.container }>
					<View style={styles.groupname}>
						<Text>{name}</Text>
					</View>
					<View style={styles.date}>
						<Time createdAt={ createdAt } />
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	_handleItemTouch(){
		let{selectGroup, groupId} = this.props;
		selectGroup(groupId);
	}


}

export default GroupTile;

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
	groupname:{
		flex:3,
		padding:10,
		paddingTop:5,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center'
	},
	date:{
		flex:1,
		padding:10,
		paddingTop:5,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center'
	}
})