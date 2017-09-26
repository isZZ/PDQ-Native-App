import React, {PropTypes, Component} from 'react' 
import {View, StyleSheet, Text, Button} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { authSignInWithToken } from '../actions/auth'
import {Actions} from 'react-native-router-flux'
import ScreenSplash from '../components/ScreenSplash'

const SceneSplash = (props) => {
	return(
		<ScreenSplash {...props} />
	)
}

const mapStateToProps = (state) => {

		return Object.assign({}, state, {
			
		});
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		gotoDashboard: () => {
			dispatch(Actions.authenticated);
		},
		authSignInWithToken: () => {
			dispatch( authSignInWithToken() );
		},
		gotoPasswordRecovery: () => {
			dispatch(Actions.scenePasswordRecovery);
		},
		gotoSubscribe: () => {
			dispatch(Actions.sceneSubscribe);
		},
		gotoLogin: () => {
			dispatch(Actions.sceneLogin);
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SceneSplash);
