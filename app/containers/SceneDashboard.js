import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import ScreenDashboard from '../components/ScreenDashboard'
import { navigateReset, navigatePush, navigateJumpToKey, navigateJumpToIndex } from '../actions/navigation.js'
import { conversationCreateStart } from '../actions/conversationCreate.js'
import { activitiesRecent } from '../actions/activities.js'
import { fetchGroups } from '../actions/groups.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
import { conversationsFetch } from '../actions/conversations.js'
import { conversationClick } from '../actions/conversation.js'
import {Actions} from 'react-native-router-flux'

const mapStateToProps = ( state ) => {
	
	let { conversationIds, conversationsMeta } = state.conversations;
	let { user_profiles } = state.userProfiles;
	let { uid } = state.auth;
	let conversations = []
	for( let key in conversationIds ){
		let users = {};
		let conversationId = conversationIds[key]
		if( conversationsMeta[conversationId] ){
			let conversationsObj = conversationsMeta[conversationId];
			
			//Add User Profiles
			for(let userKey in conversationsObj.users){
				

				let userProfile = user_profiles[userKey]

				if( userProfile ){
					users[ userKey ] = userProfile;
				}


			}
			conversationsObj['userProfile'] = users;

			conversationsObj['conversationId'] = conversationId;
			conversations.push( conversationsMeta[conversationId] )
		}
	}

	return Object.assign({}, state, { 
		conversations,
		uid
	});

}

const mapDispatchToProps = ( dispatch ) => {
	return {
		updateActivities: () => {
			//dispatch( activitiesRecent() );
		},
		updateConversations: () => {
			dispatch( conversationsFetch() );
		},
		linkPressed: () => {
			//dispatch( navigatePush( 'Conversations' ) );
		},
		fetchUserGroups:() => {
			dispatch( fetchGroups() );
		},
		showCreateConversation: () => {
			dispatch(conversationCreateStart());
			//dispatch( Actions.sceneChatOptionsGroupSelect );
		},
		gotoConversation: ( conversationId, usernames ) => {
			dispatch( conversationClick( conversationId ) );
			//dispatch( navigatePush( { key: 'SceneConversation', title: usernames, showHeader:true }  ) );
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( ScreenDashboard )