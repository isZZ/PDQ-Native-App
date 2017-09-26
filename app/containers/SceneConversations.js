import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { ScreenConversations } from '../components/ScreenConversations'
import { navigateReset, navigatePush, navigateJumpToKey, navigateJumpToIndex } from '../actions/navigation.js'
import { conversationsFetch } from '../actions/conversations.js'
import { conversationClick } from '../actions/conversation.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
import merge from 'lodash/fp/merge';
import {Actions} from 'react-native-router-flux'

class Conversations extends Component {
	render(){
		return(
			<ScreenConversations {...this.props} />
		)
	}
}
 
const mapStateToProps = ( state ) => {
	
	let { conversationsIds, conversationsMeta } = state.conversations;
	var conversations = conversationsIds.map( function( id ){
		var conversationMeta = conversationsMeta[id];
		if(typeof conversationMeta === 'object'){
			return conversationMeta;
		}
	});
	return {
		conversations: conversations || []
	}
}
 
const mapDispatchToProps = ( dispatch ) => {
	return {
		updateConversations: () => {
			dispatch( conversationsFetch() );
		},
		gotoConversation: ( conversationId ) => {
			dispatch( conversationClick(conversationId) );
			//dispatch( Actions.Conversation );
		}
	}
} 


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenConversations)