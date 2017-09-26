import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native' 
import ToolTip from './ToolTip.js'
import { Fader } from '../components/Fader.js'
import Icon from 'react-native-vector-icons/FontAwesome';

export class SelectPillbox extends Component {

  constructor(){
    super()
    // this.onModalPress = this.onModalPress.bind(this)
    // this.onPressButton = this.onPressButton.bind(this)

  }

  render(){
    //let { selected, deleteModal } = this.state;
    let { onPress, onPillDelete, showModal, selected } = this.props
    console.log('SELECTED FILTER'+selected)
    return(
      <View style={ styles.container }>
        <View style={ styles.pillbox }>
          {selected.map(( pillProp ) => {
            let { value, name } = pillProp
            return (
                //<TouchableOpacity onPress={ () => onPress( value ) } key={ value } >
                  <View style={ styles.pill }>
                    <Text style={ styles.pillText }>
                      { name.substring(0,8) }
                    </Text>
                    <TouchableOpacity onPress={ () => onPillDelete(value) } style={ styles.IconContainer }><Icon name="close" size={ 16 } color="#1976D2" style={ styles.Icon } /></TouchableOpacity>
                  </View>
                //</TouchableOpacity>
              )
          })}
        </View>
      </View> 
    )
  }

  // onPressButton( pillId ){
  //   this.setState( { deleteModal : pillId } )
  // }

  // onModalPress( ){
  //   console.log('PRESSED VALUE')
  //     let { selected, deleteModal } = this.state
  //     for( let key in selected ){
  //       let pill = selected[key]
  //       if( pill.value === deleteModal ){
  //         selected.splice( key, 1 ) 
  //         this.setState( { selected: selected } )
  //         console.log( JSON.stringify(selected) )
  //       }
  //     }
  //     this.setState( { deleteModal: false } )
  //     deleteModal = false
  // }  

}

var Modal = ( props ) =>  {

  if ( props.warn === false ) {
    return null;
  }

  return (
      <View style={ styles.modal } >
        <TouchableOpacity onPress={ props.onAccept } style={ styles.modalButton }>
          <Text style={ styles.modalText }>Touch to remove user from conversation!</Text>
            <TouchableOpacity onPress={ props.onDiscard } style={ styles.IconContainer }>
              <View>
                <Icon name="close" size={ 16 } color="#1976D2" style={ styles.Icon } />
              </View>
            </TouchableOpacity>
        </TouchableOpacity>
      </View>
  );

}



const styles = StyleSheet.create({
  container:{
    overflow:'visible',
    minHeight:50,
  },
  pillbox:{
    paddingLeft:10,
    paddingRight:10,
    marginBottom:30,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    overflow:'visible',
  },
  pill:{
    backgroundColor:'#1976D2',
    borderRadius:20,
    padding:10,
    paddingRight:45,
    height:40,
    overflow:'visible',
    marginBottom:2,
    marginRight:2

  },
  pillText: {
    textAlign:'center',
    overflow:'visible',
    color:'#ffffff',
  },
  modal: {
    flex:1,
    flexDirection:'row',
    position:'absolute',
    justifyContent: 'space-between',
    left:20,
    right:20,
    top:20,
    bottom:0,
    height:50,
    backgroundColor:'#FF5252',
    opacity:0.9
  },
  modalButton:{
    flex:1,
    padding:10,
    flexDirection:'row',
  },
  modalText: {
    textAlignVertical:'center',
  },
  IconContainer:{
    position:'absolute',
    right:4,
    top:4,
    width:32,
    height:32,
    backgroundColor:'#0068c0',
    borderRadius:16,
    alignItems:'center',
    overflow:'visible',
    marginLeft:10,
  },
  Icon:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    textAlignVertical:'center'
  }
});