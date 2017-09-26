import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner as SpinnerKit } from 'react-native-spinkit';

class Spinner extends Component {
  render() {
    return (
      <SpinnerKit
        style={styles.spinner}
        isVisible={this.props.isVisible}
        size={45}
        type={'CircleFlip'}
        color={'#8e44ad'}
      />
    );
  }
}

// Login.propTypes = {
//   isVisible: PropTypes.bool.isRequired,
// };

var styles = StyleSheet.create({
  spinner: {
    margin: 10,
  },
});

export default Spinner;