import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Button } from './Button'
import { WithLabel } from './WithLabel'
import { FormTextInput } from './FormTextInput'
import { Activity } from './Activity'
import { Label } from './Label'
import { getLocalState } from '../reducers'

export class Activities extends Component {

	render(){
		let { activities } = this.props;
		var width = Dimensions.get('window').width;

		return(
			<View>
				<Label text="Activity" />
				<View style={ styles.container }>
					{Object.keys(activities).map((key) => {
						return <Activity key={ key } {...activities[key]} />
					})}
				</View>
			</View>
		)
	}

	componentWillMount(){
		let { updateActivities } = this.props;
		updateActivities();
	}

}

const styles = StyleSheet.create({ 
    container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor:'blue',
		width: Dimensions.get('window').width
    }
  })
