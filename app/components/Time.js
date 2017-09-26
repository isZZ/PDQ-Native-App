import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

export default class Time extends React.Component {
  render() {
    let createdAt = moment(this.props.createdAt);
    let iscurrentDate = createdAt.isSame(new Date(), "day");
    let displayDate = (iscurrentDate)?createdAt.locale('en').format('LT'):createdAt.locale('en').format('MMM D');
    
    return (
      <View>
        <Text style={ styles.time }>
          { displayDate }
        </Text>
      </View>
    );
  }
}

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  time: {
    fontWeight: "300",
    fontSize:12,
    textAlign:'right',
    fontFamily:'roboto'
  }
};

Time.contextTypes = {
  getLocale: React.PropTypes.func,
};

Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  containerStyle: {},
  textStyle: {},
};

// Time.propTypes = {
//   position: React.PropTypes.oneOf(['left', 'right']),
//   currentMessage: React.PropTypes.object,
//   containerStyle: React.PropTypes.shape({
//     left: View.propTypes.style,
//     right: View.propTypes.style,
//   }),
//   textStyle: React.PropTypes.shape({
//     left: Text.propTypes.style,
//     right: Text.propTypes.style,
//   }),
//};
