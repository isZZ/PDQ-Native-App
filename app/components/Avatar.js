/*
**  This component will be published in a separate package
*/
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class Avatar extends React.Component {
  render() {
    return (
      <Image
        source={{uri: this.props.user.avatar}}
        style={ styles.avatarStyle }
      />
    );
  }
}

const styles =  StyleSheet.create({
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
});
