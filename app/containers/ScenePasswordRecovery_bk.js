import { connect } from 'react-redux'
import ScreenPasswordRecovery from '../components/ScreenPasswordRecovery'
import { navigateReset, navigatePush, navigatePop } from '../actions/navigation.js'
import { userReset, userValidate, userUpdate } from '../actions/user_validation.js'
import { userFetching, userSuccess, userFailure, userSubmit  } from '../actions/user.js'
import { reduxForm } from 'redux-form'
import { getLoginState } from '../reducers'
 
const mapStateToProps = (state) => {
		return Object.assign({}, state, {

  		});
} 

const mapDispatchToProps = (dispatch) => {
  return {
  	gotoLogin: () => {
		dispatch( navigatePop() )
	},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ScreenPasswordRecovery )