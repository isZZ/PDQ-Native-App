'use strict'

import React, {PropTypes, Component} from 'react' 
import {NavigationExperimental, View, StyleSheet, Text, ToastAndroid} from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SceneLogin from './SceneLogin'
import SceneSubscribe from './SceneSubscribe'
import SceneSubscribeProfile from './SceneSubscribeProfile'
import ScenePasswordRecovery from './ScenePasswordRecovery'
import SceneDashboard from './SceneDashboard'
import SceneChatOptions from './SceneChatOptions'
import SceneConversation from './SceneConversation'
import Geolocator from './Geolocator'
import { fetchGroups } from '../actions/groups'
  
// import Dashboard from './Dashboard'
// import Conversations from './Conversations'
// import Conversation from './Conversation'
// import Modal from './Modal'
//import Login from './Login'
import { navigatePop } from '../actions/navigation.js'

//var Auth0Lock = require('react-native-lock');
//var lock = new Auth0Lock({clientId: "rCnI5jZpLgFZ78kJvPw2owB88N1hvsdI", domain: "isz.au.auth0.com"});
// lock.show({}, (err, profile, token) => {
//   console.log('Logged in!');
// });

const {
	Transitioner: NavigationTransitioner,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental
//() => ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)
class AppContainer extends Component {
	render() {
		let { navigation, backAction } = this.props
		return (
				
				// Redux is handling the reduction of our state for us. We grab the navigationState 
				// we have in our Redux store and pass it directly to the <NavigationTransitioner />.
				<NavigationTransitioner 
					navigationState={ navigation }
					style={ styles.container }
					render={ props => (
						// This mimics the same type of work done in a NavigationCardStack component
						<View style={ styles.container }>
							<Geolocator />
							<NavigationCard 
								// <NavigationTransitioner>'s render method passes `navigationState` as a 
								// prop to here, so we expand it plus other props out in <NavigationCard>.
								{ ...props }
								// Transition animations are determined by the StyleInterpolators. Here we manually
								// override the default horizontal style interpolator that gets applied inside of 
								// NavigationCard for a vertical direction animation if we are showing a modal.
								// (Passing undefined causes the default interpolator to be used in NavigationCard.)

								style={  props.scene.route.key === 'Modal' || props.scene.route.key === 'SceneChatOptions' ?
											NavigationCard.CardStackStyleInterpolator.forVertical(props) :
											undefined
								}
								onNavigateBack={ backAction }
								// By default a user can swipe back to pop from the stack. Disable this for modals.
								// Just like for style interpolators, returning undefined lets NavigationCard override it.
								panHandlers={ props.scene.route.key === 'Modal' ? null : undefined }
								renderScene={ this._renderScene }
								key={ props.scene.route.key }
							/>
							{ this._renderNavigationHeader( props, backAction ) }
						</View>  
				)}
			/>
		)
	}

	componentDidMount(){
		this.props.fetchGroups();
	}

	_renderNavigationHeader(props, backAction){
		if( !props.scene.route.showHeader  ) return; 
		return(  
			<NavigationHeader
				{...props}
				style={ styles.header }
				onNavigateBack={ backAction }
				renderTitleComponent={props => {
					const title = props.scene.route.title
					return <NavigationHeader.Title><Text style={ styles.navigationTitle }>{ title.toUpperCase() }</Text></NavigationHeader.Title>
				}}
				// When dealing with modals you may also want to override renderLeftComponent...
			/>
		)
	}

	_renderScene( { scene } ) {
		
		const { route } = scene
		switch( route.key ) {
		case 'SceneLogin':
			return <SceneLogin />
		case 'SceneSubscribe':
			return <SceneSubscribe />
		case 'SceneSubscribeProfile':
			return <SceneSubscribeProfile /> 
		case 'ScenePasswordRecovery':
			return <ScenePasswordRecovery />
		case 'SceneDashboard':
			return <SceneDashboard />
		case 'SceneChatOptions':
			return <SceneChatOptions />
		case 'SceneConversation':
			return <SceneConversation />
		// case 'Activity':
		// 	return <Activity />
		// case 'Conversations':
		// 	return <Fifth />
		// case 'Fifth':
		// 	return <Dashboard />
		// case 'Friends':
		// 	return <Friends />
		// case 'Conversations':
		// 	return <Conversations />
		// case 'Conversation':
		// 	return <Conversation />
		// case 'Settings':
		// 	return <Settings />
		// case 'Modal':
		// 	return <Modal />
		}
	}

}

AppContainer.propTypes = {
	navigationState: PropTypes.object,
	backAction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1A212C'
	},
	header:{
		backgroundColor:'#fff',
		height:50,
	},
	navigationTitle:{
		fontSize:16,
		color:'#4a4c4d',
		textAlign:"center"
	}
})

export default connect(
	state => ({
		navigation : state.navigation,
	}),
	dispatch => ({
		backAction: () => {
			dispatch(navigatePop());
		},
		fetchGroups: () => {
			dispatch(fetchGroups());
		}
	})
)(AppContainer)