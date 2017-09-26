import React, {Component} from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from './constants/config'
import reducer from './reducers'
import {View, Text, StyleSheet, AsyncStorage } from 'react-native'
import AppContainer from './containers/AppContainer'
const firebaseApp = firebase.initializeApp( FIREBASE_CONFIG )
//import {persistStore, autoRehydrate} from 'redux-persist'

const store = configureStore()
//if (typeof self === 'object') persistStore(store);

export default class pdq extends Component { 
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
	}
}

