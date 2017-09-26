//var ValidateModel = require('validate-model');
//var validate = ValidateModel.validate;
//var validateAll = ValidateModel.validateAll;

// *** Action Types ***
export const RESET_AUTHVALIDATION  = 'RESET_AUTHVALIDATION'
export const ERROR_AUTHVALIDATION  = 'ERROR_AUTHVALIDATION'
export const UPDATE_AUTHVALIDATION = 'UPDATE_AUTHVALIDATION'
export const VALID_AUTHVALIDATION = 'VALID_AUTHVALIDATION'

// *** Action Creators ***
// The following action creators were derived from AuthReducer
export function authReset() {
	return {
		type: RESET_AUTHVALIDATION,
	}
}

export function authValidate( validation ) {
	//var validation = validateAll( LoginValidators, creds );
	if( !validation.valid  ){
		return {
			type: ERROR_AUTHVALIDATION,
			validation: validation
		} 
	}else{
    return {
      type: VALID_AUTHVALIDATION,
      validation: validation
    } 
  }
}

export function authUpdate( field ) {
	return {
		type: UPDATE_AUTHVALIDATION,
		field
	}
}  

// var LoginValidators = {
//   email: {
//     title: 'email',
//     validate:[ 
//     {
//       validator: 'isEmail',
//       message: '{TITLE} must be valid'
//     }
//     ]
//   },
//   password: {
//     title: 'password',
//     validate: [
//     {
//       validator: 'isLength',
//       arguments: [8, 255],
//       message: '{TITLE} is too short'
//     }
//     ]
//   }
// };
