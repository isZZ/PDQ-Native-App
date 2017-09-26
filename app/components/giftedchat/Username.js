import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Usename extends React.Component {
  render() {
    return (
      <View style={styles.username}>
        <Text style={styles.usernameText}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  username:{
    marginLeft:65
  },
  usernameText:{
    fontSize:13,
  }
});
