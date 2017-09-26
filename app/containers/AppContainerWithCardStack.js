'use strict'

import React, {PropTypes, Component} from 'react'
import {NavigationExperimental, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import First from './First'
import Second from './Second'
import Third from './Third'
import Fourth from './Fourth'
import Fifth from './Fifth'
import Dashboard from './Dashboard'
import Conversations from './Conversations'
import Conversation from './Conversation'
import Modal from './Modal'
import { navigatePop, navigatePush } from '../actions/navigation.js'

const {
	CardStack: NavigationCardStack,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental

// Known bug in v0.30: https://github.com/facebook/react-native/issues/7422#issuecomment-236280199
console.ignoredYellowBox = ['Warning: Failed prop type: Required prop `scene` was not specified in `NavigationHeader`']


class AppContainerWithCardStack extends Component {
	render() {
		let { navigation, backAction } = this.props

		return (

			// Redux is handling the reduction of our state for us. We grab the navigationState 
			// we have in our Redux store and pass it directly to the <NavigationCardStack />.
			<NavigationCardStack
				navigationState={navigation}
				onNavigateBack={backAction}
				style={styles.container}
				direction={navigation.routes[navigation.index].key === 'Modal' ?
					'vertical' : 'horizontal'
				}
				renderOverlay={props => ( 
					<NavigationHeader
						{ ...props }
						onNavigateBack={ backAction }
						renderTitleComponent={props => {
							const title = props.scene.route.title
							return <NavigationHeader.Title>{ title }</NavigationHeader.Title>
						}}
					/>
					// When dealing with modals you may also want to override renderLeftComponent...
				)}
				renderScene={this._renderScene}
			/>
		)
	}

	_renderScene({scene}) {
		const { route } = scene
		if(__DEV__){
			console.log( "_____________________________________________________________________SCENE"+scene )
		}
		switch(route.key) {
		case 'First':
			return <First />
		case 'Second':
			return <Second />
		case 'Third':
			return <Third />
		case 'Fourth':
			return <Fourth />
		case 'Fifth':
			return <Fifth />
		case 'Dashboard':
			return <Dashboard />
		case 'Conversations':
			return <Conversations />
		case 'Conversation':
			return <Conversation />
		case 'Modal':
			return <Modal />
		}
	}
}

AppContainerWithCardStack.propTypes = {
	navigationState: PropTypes.object,
	backAction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default connect(
	state => ({
		navigation: state.navigation
	}),
	dispatch => ({
		backAction: () => {
			dispatch(navigatePop())
		}
	})
)(AppContainerWithCardStack)