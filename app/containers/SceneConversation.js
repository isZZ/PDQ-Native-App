import { connect } from 'react-redux'
import ScreenConversation  from '../components/ScreenConversation'
import { navigateReset, navigatePush } from '../actions/navigation.js'
import * as firebase from 'firebase';
//import { FIREBASE_CONFIG } from '../constants/config';
import { passwordResetSubmit } from '../actions/password_reset.js'
import { messagesWrite, messagesWriteImage } from '../actions/messages.js'
import { passwordResetValidationValidate, passwordResetValidationUpdate, passwordResetValidationReset  } from '../actions/password_reset_validation.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'

var ValidateModel = require( 'validate-model' );
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;
 
const mapStateToProps = ( state ) => {

	//Setup messages in GiftedChat format
	var currentConversationId = state.conversation.conversationId;
	var conversationMessages = state.messages.messagesGroupedByConversationId[currentConversationId];
	var messages = [];

	for( var i in conversationMessages ){
		let message = {};
		let user = {}
		let conversationId = conversationMessages[i];
		let conversationObj = state.messages.messages[conversationId];
		let UID = conversationObj.UID;
		let messageUser = state.userProfiles.user_profiles[UID];
		let image = conversationObj.image || {}

		message._id = conversationId;
		message.text = conversationObj.message;
		message.createdAt = conversationObj.createdAt;
		message.image = image.url;

		if(typeof(messageUser)=='object'){
			user._id = UID;
			user.name = (typeof(messageUser.username)=='undefined')?'':messageUser.username;
			user.avatar = (typeof(messageUser.avatar)=='undefined' || typeof(messageUser.avatar.url)=='undefined')?'https://facebook.github.io/react/img/logo_og.png':messageUser.avatar.url;
		}

		message.user = user;

		console.log('MESSAGE DATA');
		console.log(message);

		messages.push( message ); 
	}

	messages = messages.reverse();

    return {
    	conversationId: state.conversation.conversationId,
    	conversationUserIds: state.conversation.conversationUserIds,
    	conversationUserRoles: state.conversation.conversationUserRoles,
    	userProfiles: state.user_profiles,
    	messages: messages,
    	uid: state.auth.uid
    }
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		onMessageSend: ( message, conversationId ) => {
			dispatch( messagesWrite( message[0], conversationId ) )
		},
		onImageSelect: ( source ) => {
			dispatch( messagesWriteImage( source ) )
		},
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ScreenConversation )