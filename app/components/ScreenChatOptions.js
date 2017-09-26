import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, ScrollView} from 'react-native'
import { Button } from 'react-native-elements'
import { NavButton } from './NavButton'
import { Spinner } from '../components/Spinner.js'
import { Overlay } from '../components/Overlay.js'
import { UserList } from '../components/UserList.js'
import { SelectPillbox }  from '../components/SelectPillbox.js'
import { Label } from './Label'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Grid, Row} from 'react-native-elements';

//Properties get mapped by the state and merged with the component props e.g. props.onButtonPress 


class ScreenChatOptions extends Component{

	constructor( props ){
		super( props )
		this.onPillDelete = this.onPillDelete.bind(this)
		this.onModalDiscard = this.onModalDiscard.bind(this)
		this.onPressButton = this.onPressButton.bind(this)
		this.onUserButton = this.onUserButton.bind(this)

	    this.state = {
	      selected: [],
	      deleteModal: false
		}
		
		this.onCreateConversation = this.onCreateConversation.bind(this)
	}

	render(){
		let props = this.props;
		let { selected, deleteModal } = this.state;
		return(
			<View style={{flex:1}}>
				<Grid style={{flex:1}}>
					<Row size={2} style={{marginTop:80}}> 
						{ selected.length > 0 && <Label text="Selected Members" />}
						<ScrollView>
							<SelectPillbox { ...props } onPress={ this.onPressButton } onPillDelete={ this.onPillDelete } selected={ selected } showModal={ deleteModal } />
						</ScrollView>
					</Row>

					<Row size={3} style={{flex:1}}>
						<Label text="Select Users" />
				 		<ScrollView contentContainerStyle={styles.contentContainer}>
							<UserList { ...props } onUserButton={ this.onUserButton } />
				 		</ScrollView>
					</Row>
					
						{ selected.length > 0 &&
							<Button
								large
								raised
								icon={{name: 'chat'}}
								title='CREATE CONVERSATION'
								backgroundColor='#1976D2'
								buttonStyle={styles.button}
								disabledStyle={styles.disabledButton}
								onPress={this.onCreateConversation.bind( this )}
								disabled={props.isFetching}
							/>
						}
					
				</Grid>
			</View>
		)
	}

	onUserButton( name, value ){

		let object = {
			name,
			value
		}
		let { selected } = this.state;
		let found = selected.filter( function( obj ){
			if(obj.value === object.value){
				return obj.value;
			}
		} )[0];

		if( typeof( found ) === 'undefined' ){
			this.setState((prevState, props) => {
  				return { selected: prevState.selected.concat( object ) };
			});
		}
	} 

	onPressButton( pillId ){
    	this.setState( { deleteModal : pillId } )
  	}

	onPillDelete(uid){
		console.log('DELETE THIS PILL');
		console.log(uid);
		//console.log('modal accepted')
		let { selected } = this.state
		for( let key in selected ){
			let pill = selected[key]
			if( pill.value === uid ){
			  selected.splice( key, 1 ) 
			  this.setState( { selected: selected } )
			}
		}
		// this.setState( { deleteModal: false } )
		// deleteModal = false  
	}

	onModalDiscard( ){
		this.setState( { deleteModal: false } )
	}

	onCreateConversation(){
		this.props.createConversation( this.state.selected, this.props.groupId )
	}

	onCloseModal(){
		if(__DEV__){
			console.log('CLOSE MODAL PROPS')
			console.log(JSON.stringify(this.props))
		}
	}
}


// FirstScreen.state = {
	
// }

// DashboardScreen.propTypes = {
// 	onButtonPress: PropTypes.func.isRequired
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	closeModalButton:{
		position:'absolute',
		top:10,
		right:10,
	},
	body:{
		flex: 1,
		alignSelf: 'stretch',
		marginTop:60,
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30,
		textAlign: 'center'
	},
	link: {
		color: '#cccccc'
	},
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: '#ffffff',
		marginBottom: 30
	},
	buttonContainer:{
		position:'absolute',
		top:10,
		right:10,
	},
	button:{
		position:'absolute',
		bottom:10,
		alignSelf:'center',
		// marginTop:60,
		// marginLeft:0,
		// marginRight:0,
		borderRadius:5,
		// height:50,
		width:300,
		marginBottom:20
	},
	buttonText:{
		fontFamily: 'Roboto',
    	fontSize: 16,
    	fontWeight:"600",
    	color:'#ffffff',
    	textAlign:'center'
	},
	disabledButton:{
		backgroundColor:'#0070b6'
	},
	buttonNormal:{

	},
	contentContainer:{
		paddingBottom:80
	},
	center:{
		flex:1,
		alignItems:'center',
		justifyContent:'flex-end'
	},
	// buttonContainer:{
	// 	width:300
	// },
})

export default ScreenChatOptions