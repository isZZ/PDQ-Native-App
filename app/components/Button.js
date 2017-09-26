import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';

class Button extends Component {
  
  render() {
    let buttonStyle;
    let buttonTextStyle;

    if (this.props.styles) {
      buttonStyle = this.props.styles.button;
      buttonTextStyle = this.props.styles.buttonText;
    }

    return (
      <TouchableHighlight
        style={[styles.button, buttonStyle]}
        onPress={ this.props.onButtonPressed }
        underlayColor='rgba( 250, 196, 15, .6)'
      >
        <View>
          <Text style={[styles.buttonText, buttonTextStyle]}>
            {this.props.buttonText.toUpperCase()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  styles: PropTypes.object,
  onButtonPressed: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

var styles = StyleSheet.create({
  button: {
    height: 50,
    width: 300,
    borderRadius: 25,
    backgroundColor: '#fac413',
    borderWidth:3,
    borderColor:'#fac413',
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#113340',
    fontSize: 18,
    fontWeight: '300'
  },
});

export default Button;