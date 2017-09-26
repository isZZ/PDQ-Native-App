'use strict'
import configureStore from '../store/configureStore'
import React, {PropTypes, Component} from 'react'
import HockeyApp from 'react-native-hockeyapp'
import {NavigationExperimental, View, StyleSheet, Text, ToastAndroid, StatusBar} from 'react-native'
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst, Switch} from 'react-native-router-flux'
import { connect } from 'react-redux'
import SceneLogin from './SceneLogin'
import SceneSubscribe from './SceneSubscribe'
import SceneSubscribeProfile from './SceneSubscribeProfile'
import ScenePasswordRecovery from './ScenePasswordRecovery'
import SceneDashboard from './SceneDashboard'
import SceneChatOptions from './SceneChatOptions'
import SceneChatOptionsGroupSelect from './SceneChatOptionsGroupSelect'
import SceneConversation from './SceneConversation'
import SceneSplash from './SceneSplash'
import Geolocator from './Geolocator'
import {fetchGroups} from '../actions/groups'
import {addAuthTokenListener} from '../actions/auth'
import {startGeolLocation, stopGeolLocation} from '../actions/geolocation'
import {sendNotification} from '../actions/notifications'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
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

	constructor(props){
		super(props);
	}

	render() {
		let { navigation, backAction } = this.props;
		const getSceneStyle = (props, computedProps) => {
		  const style = {
		    flex:1
		  };
		  return style;
		};

		return (
			<View style={{flex:1}}>
				<StatusBar
					backgroundColor={'#1976D2'}
					barStyle='light-content'
        		/>
				<Router getSceneStyle={getSceneStyle}>
					<Scene key="root">
						<Scene key="sceneSplash" component={SceneSplash} title="Splash"  initial={true} sceneStyle={styles.loginScene} hideNavBar />
						<Scene key="login" hideNavBar style={styles.loginWrapper} sceneStyle={styles.loginStyle}>
							<Scene key="sceneLogin" component={SceneLogin} title="Login" sceneStyle={styles.loginStyle} initial={true} />
							<Scene key="sceneSubscribe" component={SceneSubscribe} title="sceneSubscribe" sceneStyle={styles.loginScene} />
							<Scene key="sceneSubscribeProfile" component={SceneSubscribeProfile} title="sceneSubscribe" sceneStyle={styles.loginScene} />
							<Scene key="scenePasswordRecovery" component={ScenePasswordRecovery} title="scenePasswordRecovery" sceneStyle={styles.loginScene} />
						</Scene>
						<Scene key="main" sceneStyle={styles.mainScene} navigationBarStyle={ styles.navigationBarStyle } titleStyle={ styles.titleStyle }>
							<Scene key="sceneDashboard" component={SceneDashboard} title="Conversations" initial={true} sceneStyle={styles.mainScene} />
							<Scene key="sceneConversation" component={SceneConversation} title="Conversation" sceneStyle={styles.mainScene} />
							<Scene key="sceneChatOptions" component={SceneChatOptions} title="Conversation Options" sceneStyle={styles.mainScene} />
							<Scene key="sceneChatOptionsGroupSelect" component={SceneChatOptionsGroupSelect} title="Select Group" sceneStyle={styles.mainScene} />
						</Scene>
					</Scene>
				</Router>
			</View>
		)
	}

	componentDidMount(){
		this.props.startAuthorListener();
		this.props.sendNotification();
		HockeyApp.start();
		HockeyApp.checkForUpdate(); // optional
	}

	componentWillMount() {
		HockeyApp.configure("e01832783fd64cd3957c97ff17cf4f59", true);
	}



	// _renderNavigationHeader(props, backAction){
	// 	if( !props.scene.route.showHeader  ) return; 
	// 	return(  
	// 		<NavigationHeader
	// 			{...props}
	// 			style={ styles.header }
	// 			onNavigateBack={ backAction }
	// 			renderTitleComponent={props => {
	// 				const title = props.scene.route.title
	// 				return <NavigationHeader.Title><Text style={ styles.navigationTitle }>{ title.toUpperCase() }</Text></NavigationHeader.Title>
	// 			}}
	// 			// When dealing with modals you may also want to override renderLeftComponent...
	// 		/>
	// 	)
	// }

	// _renderScene( { scene } ) {
		
	// 	const { route } = scene
	// 	switch( route.key ) {
	// 	case 'SceneLogin':
	// 		return <SceneLogin />
	// 	case 'SceneSubscribe':
	// 		return <SceneSubscribe />
	// 	case 'SceneSubscribeProfile':
	// 		return <SceneSubscribeProfile /> 
	// 	case 'ScenePasswordRecovery':
	// 		return <ScenePasswordRecovery />
	// 	case 'SceneDashboard':
	// 		return <SceneDashboard />
	// 	case 'SceneChatOptions':
	// 		return <SceneChatOptions />
	// 	case 'SceneConversation':
	// 		return <SceneConversation />
	// 	// case 'Activity':
	// 	// 	return <Activity />
	// 	// case 'Conversations':
	// 	// 	return <Fifth />
	// 	// case 'Fifth':
	// 	// 	return <Dashboard />
	// 	// case 'Friends':
	// 	// 	return <Friends />
	// 	// case 'Conversations':
	// 	// 	return <Conversations />
	// 	// case 'Conversation':
	// 	// 	return <Conversation />
	// 	// case 'Settings':
	// 	// 	return <Settings />
	// 	// case 'Modal':
	// 	// 	return <Modal />
	// 	}
	// }

}

// const connectedSwitch = connect(
//     (state) => ({
//         profile: state.Auth.profile,
//     })
// )(Switch);

// const selectScene = (props) => (
//     props.profile.id
//         ? 'authenticated'
//         : 'anonymous'
// );


AppContainer.propTypes = {
	navigationState: PropTypes.object,
	backAction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1A212C',
	},
	header:{
		backgroundColor:'#fff',
		height:50,
	},
	navigationTitle:{
		fontSize:16,
		color:'#4a4c4d',
		textAlign:"center"
	},
	loginScene:{
		backgroundColor:'#1A212C',
		flex:1,
	},
	mainScene:{
		flex: 1,
		backgroundColor:'#f5f5f5',
	},
	navigationBarStyle:{
		backgroundColor:'#2196F3'
	},
	titleStyle:{
		color:'#FFFFFF',
	},
})

export default connect(
	state => ({
		navigation : state.navigation,
	}),
	dispatch => ({
		backAction: () => {
			dispatch( navigatePop() );
		},
		fetchGroups: () => {
			dispatch( fetchGroups() );
		},
		startAuthorListener: () => {
			dispatch( addAuthTokenListener() )
		},
		sendNotification: () => {
			//dispatch(sendNotification());
		}
	})
)(AppContainer)