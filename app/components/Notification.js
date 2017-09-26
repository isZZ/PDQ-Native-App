import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';

class Notification extends Component {
  render() {
    return (
      <Text
        style={styles.text}
      >
        {this.props.errorMessage}
      </Text>
    );
  }
}

Notification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

var styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#7f8c8d',
    marginTop: 15
  },
});

export default Notification;