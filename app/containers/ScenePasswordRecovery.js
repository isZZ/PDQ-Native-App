import { connect } from 'react-redux'
import ScreenPasswordRecovery from '../components/ScreenPasswordRecovery'
import { navigateReset, navigatePush, navigatePop } from '../actions/navigation.js'
import { passwordResetSubmit } from '../actions/password_reset.js'
import { passwordResetValidationValidate, passwordResetValidationUpdate, passwordResetValidationReset  } from '../actions/password_reset_validation.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
import {Actions} from 'react-native-router-flux'


var ValidateModel = require( 'validate-model' );
var validate = ValidateModel.validate;
var validateAll = ValidateModel.validateAll;
 
const mapStateToProps = (state) => {
		return Object.assign({}, state, {
			isFetching : state.passwordReset.isFetching,
			email : state.passwordResetValidation.email,
			valid : state.passwordResetValidation.valid,
			errorMessages : state.passwordResetValidation.messages,
			error : state.passwordReset.error,
			isReset : state.passwordReset.isReset
		});
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		gotoLogin: () => {
			Actions.pop()
		},
		onSubmit: ( email ) => {

			var validation = validate( validators.email, email );
			
			if( !Boolean( email ) ){
				validation.valid = false;
				validation.messages = ['Email can not be empty'];
			}

			dispatch( passwordResetValidationValidate( validation ) ) 
			if( validation.valid ){
				dispatch( passwordResetSubmit( email ) )
			}
		},
		onEmailChange: ( email ) => {
			email = email.trim();
			dispatch( passwordResetValidationUpdate( { email:email } ) )
		},
		onNavigateToLogin: () => {
			dispatch( Actions.sceneLogin() )
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( ScreenPasswordRecovery )


var validators = {
	email: {
		title: 'email',
		validate:[ 
		{
			validator: 'isEmail',
			message: '{TITLE} must be valid'
		}
		]
	}
}