// *** Action Types ***
export const RESET_PASSWORDRESETVALIDATION  = 'RESET_PASSWORDRESETVALIDATION'
export const ERROR_PASSWORDRESETVALIDATION  = 'ERROR_PASSWORDRESETVALIDATION'
export const UPDATE_PASSWORDRESETVALIDATION = 'UPDATE_PASSWORDRESETVALIDATION'
export const VALID_PASSWORDRESETVALIDATION = 'VALID_PASSWORDRESETVALIDATION'

// *** Action Creators ***
// The following action creators were derived from PasswordResetReducer
export function passwordResetValidationReset() {
	return {
		type: RESET_PASSWORDRESETVALIDATION,
	}
}

export function passwordResetValidationValidate( validation ) {

	if( !validation.valid  ){
		return {
			type: ERROR_PASSWORDRESETVALIDATION,
			validation
		} 
	}else{
	    return {
	      type: VALID_PASSWORDRESETVALIDATION,
	      validation
	    } 
  	}
}

export function passwordResetValidationUpdate( field ) {
	return {
		type: UPDATE_PASSWORDRESETVALIDATION,
		field
	}
}
