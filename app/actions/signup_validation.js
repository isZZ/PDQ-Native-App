//var ValidateModel = require('validate-model');
//var validate = ValidateModel.validate;
//var validateAll = ValidateModel.validateAll;

// *** Action Types ***
export const RESET_SIGNUPVALIDATION  = 'RESET_SIGNUPVALIDATION'
export const ERROR_SIGNUPVALIDATION  = 'ERROR_SIGNUPVALIDATION'
export const UPDATE_SIGNUPVALIDATION = 'UPDATE_SIGNUPVALIDATION'
export const VALID_SIGNUPVALIDATION = 'VALID_SIGNUPVALIDATION'

// *** Action Creators ***

export function signupReset() {
	return {
		type: RESET_SIGNUPVALIDATION,
	}
}

export function signupValidate( validation ) {
	//var validation = validateAll( LoginValidators, creds );
	if( !validation.valid  ){
		return {
			type: ERROR_SIGNUPVALIDATION,
			validation: validation
		} 
	}else{
    return {
      type: VALID_SIGNUPVALIDATION,
      validation: validation
    } 
  }
}

export function signupUpdate( field ) {
	return {
		type: UPDATE_SIGNUPVALIDATION,
		field
	}
}  
