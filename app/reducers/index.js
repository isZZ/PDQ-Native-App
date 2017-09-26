import { combineReducers } from 'redux'
import navigation from './navigation'
import auth from './auth'
import authValidation from './auth_validation'
import signupValidation from './signup_validation'
import signup from './signup'
import user from './user'
import userValidation from './user_validation'
import passwordReset from './password_reset'
import passwordResetValidation from './password_reset_validation'
import activities from './activities'
import userProfiles from './user_profiles'
import conversations from './conversations'
import conversation from './conversation'
import conversationCreate from './conversationCreate'
import messages from './messages'
import geolocation from './geolocation'
import groups from './groups'

export default combineReducers({
  navigation,
  auth,
  authValidation,
  signup,
  signupValidation,
  user,
  userValidation,
  passwordReset,
  passwordResetValidation,
  activities,
  userProfiles,
  conversations,
  conversation,
  messages,
  geolocation,
  groups
})

export const getLoginState = (state, filter) => 
	fromLogin.getLoginState(state.login, filter);