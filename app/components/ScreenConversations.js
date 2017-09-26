import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { ConversationTile } from './ConversationTile';
 
export class ScreenConversations extends Component {

  constructor(props){
    super(props)
  }

	render(){
		let { conversations, gotoConversation } = this.props;

		return(
			<View style={ styles.container }>
        <View style={ styles.coversations }>
  				<Text>Conversation</Text>
          <Text>{ JSON.stringify(this.props.userProfiles) }</Text>
  				{conversations.map(function(conversation, i){
  					 return <ConversationTile key={ i } { ...conversation } touchAction={ gotoConversation }  />;
  				})}
        </View>
			</View>
		)
	}

	componentWillMount(){

		let { updateConversations } = this.props;
		updateConversations();
		
	}

}

const styles =  StyleSheet.create({
  container:{
  	marginTop:100,
  	padding:20,
  },
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontWeight: '100',
    marginTop:0,
    color:'black',
    backgroundColor:'#cccccc',
    padding:20
  },
});