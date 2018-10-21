import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

class TestListEntry extends React.Component {

  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    const { name, handleQuizStart, kanjiFrom, kanjiTo } = this.props;
    handleQuizStart(name, kanjiFrom, kanjiTo);
  }

  render() {
    const { name, kanjiFrom, kanjiTo } = this.props;

    return (
      <View style={styles.listEntry}>
        <View style={styles.listHeader}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerDescription}>{`${kanjiFrom} - ${kanjiTo}`}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={.3} 
          style={styles.startButton}
          onPress={this.handleStart}
        >
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TestListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  kanjiFrom: PropTypes.number.isRequired,
  kanjiTo: PropTypes.number.isRequired,
  handleQuizStart: PropTypes.func.isRequired,
}

export default TestListEntry;