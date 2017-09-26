import { connect } from 'react-redux'
import ScreenSubscribeProfile from '../components/ScreenSubscribeProfile'
import { navigateReset, navigatePush } from '../actions/navigation.js'
import { userReset, userValidate, userUpdate } from '../actions/user_validation.js'
import { userFetching, userSuccess, userFailure, userSubmit  } from '../actions/user.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'

var ValidateModel = require('validate-model');
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;

const mapStateToProps = (state) => {

		return Object.assign({}, state, { 
			isFetching : state.user.isFetching,
			username : state.userValidation.username,
			imageData : state.userValidation.imageData || false,
			imageDataErrorMessages : state.userValidation.messages.imageData || false,
			valid : state.userValidation.valid,
			usernameErrorMessages : state.userValidation.messages.username || false,
			userError : state.user.error
			});
} 

const mapDispatchToProps = ( dispatch ) => {
	return {
		onUpdateButtonPress: ( creds ) => {
			var validation = validateAll( UserValidators, creds );
			for ( var key in creds ){
				var field = creds[key];
				if( !Boolean( field )){
					switch(key){
						case 'imageData':
						validation.messages[key] = ['Please upload an avatar image'];
						break;
						case 'username':
						validation.messages[key] = ['User cannot be empty'];
						break;
					}

					//validation.messages[key] = [key+' can not be empty'];
				}
			}
			dispatch( userValidate( validation ) ) 
			if( validation.valid && creds['imageData'] ){
				dispatch( userSubmit( creds ) )
			}
		},
		onUsernameChange: ( text ) => {
			text = text.trim();
			dispatch( userUpdate( { username: text } ) )
		},
		onImageChange: ( image ) => {
			dispatch( userUpdate( { imageData: image } ) )
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( ScreenSubscribeProfile )


var UserValidators = {
	username: {
		title: 'username',
		validate: [
		{
			validator: 'isLength',
			arguments: [3, 255],
			message: '{TITLE} is too short'
		}
		]
	}
}