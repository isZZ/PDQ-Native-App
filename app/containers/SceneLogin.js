import { connect } from 'react-redux'
import ScreenLogin from '../components/ScreenLogin'
import { navigatePush } from '../actions/navigation.js'
import { authUpdate, authValidate } from '../actions/auth_validation.js'
import { authSignIn } from '../actions/auth.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
import {Actions} from 'react-native-router-flux'

var ValidateModel = require('validate-model');
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;

const mapStateToProps = (state) => {
	return Object.assign({}, state, {
		isFetching : state.auth.isFetching,
		email : state.authValidation.email,
		password : state.authValidation.password,
		valid : state.authValidation.valid,
		emailErrorMessages : state.authValidation.messages.email || false,
		passwordErrorMessages : state.authValidation.messages.password || false,
		authError : state.auth.error
  	});
}

//Returns object with onButtonPress function with a dispatcher for next scene action
const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		gotoPasswordRecovery: () => {
			dispatch(Actions.scenePasswordRecovery);
		},
		gotoSubscribe: () => {
			dispatch(Actions.sceneSubscribe);
		},
		onLoginButtonPress: ( creds ) => {

			var validation = validateAll( authValidators, creds );
			
			for (var key in creds ){
				var field = creds[key];
				if( !Boolean( field ) ){
					validation.messages[key] = [key+' can not be empty'];
				} 
			}
			dispatch( authValidate( validation ) ) 
			if( validation.valid ){
				dispatch( authSignIn( creds ) );
			}
		},
		onEmailChange: ( text ) => {
			text = text.trim();
			dispatch( authUpdate( { email: text } ) )
		},
		onPasswordChange: ( text ) => {
			text = text.trim();
			dispatch( authUpdate( { password: text } ) )
		}, 
		loginValidate: ( creds ) => {
			var validation = validateAll( authValidators, creds );
			dispatch( authValidate( validation ) );
			dispatch( signInWithEmailAndPassword( creds ) );
		},
	}
}

/*Connects a React component to a Redux store.
It does not modify the component class passed to it.
Instead, it returns a new, connected component class, for you to use. */

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScreenLogin)

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