import React, { Component } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ToolTip from './ToolTip.js'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class FormTextInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text : '',
			focused: false       
		}
	}

	onBlur(){
		this.setState({focused: false});
	}

	onFocus(){
		this.setState({focused: true});
	}

	render() {

		function capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
		}

		if( this.props.icon ){
			var icon = <Icon name={ this.props.icon } size={22} color="white" style={ styles.icon } />
		}
		var focused = this.state.focused? styles.focused : styles.blurred;
		var labelFocused = this.state.focused? styles.labelFocused : styles.labelBlurred;
		return (  
				<View style={styles.inputContainer}>
						{ /*icon*/ }
					{/*<TextInput
											style={ styles.textinput }
											onChangeText={ this.props.onChangeText }
											placeholder={ this.props.placeholder }
											secureTextEntry={ this.props.secureTextEntry }
											value = { this.props.value }
											underlineColorAndroid = "transparent"
											multiline={ false }
											placeholderTextColor='white'
											onBlur = { () => this.onBlur() }
											onFocus = { () => this.onFocus() }
											/>*/}

						<FormLabel containerStyle={styles.containerStyle} labelStyle={[styles.labelStyle, labelFocused]}>{this.props.labelText}</FormLabel>
						<FormInput
							onChangeText={ this.props.onChangeText }
							value = { this.props.value }
							inputStyle={[styles.input, focused]}
							containerStyle={styles.containerStyle}
							underlineColorAndroid="transparent"
							onBlur = { () => this.onBlur() }
							onFocus = { () => this.onFocus() }
							secureTextEntry={ this.props.secureTextEntry }
							/>
						{ this.props.toolTip.length > 0 && <FormValidationMessage containerStyle={styles.containerStyle} labelStyle={styles.errorStyle}>{capitalizeFirstLetter(this.props.toolTip[0])}</FormValidationMessage> }
				</View>
				

		)
	} 
}

const styles = StyleSheet.create({
	// textinput: {
	//   height: 50,
	//   width: 300,
	//   backgroundColor: 'transparent',
	//   justifyContent: 'center',
	//   alignItems: 'center',
	//   color:'white',
	//   fontSize:16,
	//   paddingTop:8,
	//   paddingLeft:50,
	//   paddingRight:25,
	//   borderWidth: 0
	// },
	// focused:{
	//   borderColor: '#71B095',
	// },
	// blurred:{
		
	// },
	// placeholder: {
	//   position:'absolute',
	//   top:12,
	//   left:50,
	//   color:'white',
	//   fontSize:16,
	// },
	// textinputview: {
	//   position:'relative',
	//   borderRadius: 25,
	//   backgroundColor: 'transparent',
	//   borderWidth: 3,
	//   borderColor: '#1D7872',  
	//   marginTop: 30,
	//   backgroundColor:'rgba(255, 255, 255, 0.1)',
	// },
	// icon:{
	//   position:'absolute',
	//   top:12,
	//   left:18
	// },
	// tooltip: {
	//   overflow: 'visible'
	// },
	input:{
		borderBottomColor: '#757575',
		marginLeft:0,
		paddingLeft:0,
		width:350,
		flex: 0,
		fontSize:18,
		borderBottomWidth:1,
		color:'#757575'
	},
	containerStyle:{
		marginLeft:0,
		paddingLeft:0
	},
	labelStyle:{
		marginLeft:0,
		paddingLeft:0,
		color:'#757575'
	},
	inputContainer:{
		backgroundColor:'#212121',

	},
	errorStyle:{
		marginLeft:0,
		paddingLeft:0,
		color:'#FF5252'
	},
	focused:{
		borderBottomColor: '#BDBDBD',
		color:'#BDBDBD'
	},
	blurred:{
	},
	labelFocused:{
		color:'#BDBDBD'
	},
	labelBlurred:{

	}
});