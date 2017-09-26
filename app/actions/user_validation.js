// *** Action Types ***
export const RESET_USERVALIDATION  = 'RESET_USERVALIDATION'
export const ERROR_USERVALIDATION  = 'ERROR_USERVALIDATION'
export const UPDATE_USERVALIDATION = 'UPDATE_USERVALIDATION'
export const VALID_USERVALIDATION = 'VALID_USERVALIDATION'

// *** Action Creators ***
// The following action creators were derived from AuthReducer
export function userReset() {
	return {
		type: RESET_USERVALIDATION,
	}
}

export function userValidate( validation ) {

	if( !validation.valid  ){
		return {
			type: ERROR_USERVALIDATION,
			validation: validation
		} 
	}else{
    return {
      type: VALID_USERVALIDATION,
      validation: validation
    } 
  }
}

export function userUpdate( field ) {

	return {
		type: UPDATE_USERVALIDATION,
		field
	}
}