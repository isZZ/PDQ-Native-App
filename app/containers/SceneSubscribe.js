import { connect } from 'react-redux'
import ScreenSubscribe from '../components/ScreenSubscribe'
import { navigatePush, navigatePop } from '../actions/navigation.js'
import { signupUpdate, signupValidate } from '../actions/signup_validation.js'
import { signupSend } from '../actions/signup.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
import {Actions} from 'react-native-router-flux'

var ValidateModel = require('validate-model');
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;

const mapStateToProps = (state) => {

	return Object.assign({}, state, {
		isFetching : state.signup.isFetching,
		email : state.signupValidation.email,
		password : state.signupValidation.password,
		valid : state.signupValidation.valid,
		emailErrorMessages : state.signupValidation.messages.email || false,
		passwordErrorMessages : state.signupValidation.messages.password || false,
		authError : state.signup.error
  	});
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		gotoLogin: () => {
			Actions.pop()
		},
		onSubscribeButtonPress: ( creds ) => {

			var validation = validateAll( SignupValidators, creds );
			
			for ( var key in creds ){
				var field = creds[key];
				if( !Boolean( field ) ){
					validation.messages[key] = [key+' can not be empty'];
				}
			}

			dispatch( signupValidate( validation ) ) 
			if( validation.valid ){
				try{
				dispatch( signupSend( creds ) );
				}catch(error){
					console.log(error);
					throw(error);
				}
			}
		},
		onEmailChange: ( text ) => {
			text = text.trim();
			dispatch( signupUpdate( { email: text } ) );
		},
		onPasswordChange: ( text ) => {
			text = text.trim();
			dispatch( signupUpdate( { password: text } ) );
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( ScreenSubscribe )


var SignupValidators = {
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