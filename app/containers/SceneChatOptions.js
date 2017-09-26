import { connect } from 'react-redux'
import ScreenChatOptions from '../components/ScreenChatOptions'
import { navigatePush, navigatePop } from '../actions/navigation.js'
import { signupUpdate, signupValidate } from '../actions/signup_validation.js'
import { conversationCreate } from '../actions/conversationCreate.js'
import { signupSend } from '../actions/signup.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'

const mapStateToProps = (state) => {

	let groups = state.groups.groups;
	let groupsUsers = state.groups.groupsUsers;

	let userProfilesObj = state.userProfiles.user_profiles;
	let userProfiles = [];
	for( let userProfile in userProfilesObj ){
		if(userProfile==state.auth.uid)
			continue;
		let profile = userProfilesObj[userProfile];
		profile.uid = userProfile;
		userProfiles.push( profile );
	}

	return {
		userProfiles: userProfiles,
		uid: state.auth.uid
	}
}

//Returns object with onButtonPress function with a dispatcher for next scene action
const mapDispatchToProps = ( dispatch ) => {
	return {
		createConversation: ( conversationSelectedUsers, groupId ) => {

			console.log('CONVERSATION CREATE ADD'+groupId);
			let conversationUserIds = [];
			for( let key in conversationSelectedUsers ){
				let conversationSelectedUser = conversationSelectedUsers[key];
				conversationUserIds.push( conversationSelectedUser.value )
			}

			dispatch( conversationCreate( conversationUserIds, groupId ) )
		},
		closeModal: () => {
			console.log('close modal dispatched')
			dispatch( navigatePop() )
		}
	}
}

/*Connects a React component to a Redux store.
It does not modify the component class passed to it.
Instead, it returns a new, connected component class, for you to use. */

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenChatOptions)

var authValidators = {
	email: {
		title: 'email',
		validate:[ 
		{
			validator: 'isEmail',
			message: '{TITLE} must be valid'
		}
		]
	},
	password: {
		title: 'password',
		validate: [
		{
			validator: 'isLength',
			arguments: [8, 255],
			message: '{TITLE} is too short'
		}
		]
	}
};