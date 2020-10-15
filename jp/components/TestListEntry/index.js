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
    this.handleStudy = this.handleStudy.bind(this);
  }

  handleStart() {
    const { name, handleQuizStart, kanjiFrom, kanjiTo } = this.props;
    handleQuizStart(name, kanjiFrom, kanjiTo);
  }

  handleStudy() {
    const { name, kanjiFrom, kanjiTo, handleScreenSwitchKanjiOverview } = this.props;
    handleScreenSwitchKanjiOverview(name, kanjiFrom, kanjiTo);
  }

  render() {
    const { name, kanjiFrom, kanjiTo } = this.props;

    return (
      <View style={styles.listEntry}>
        <View style={styles.listHeader}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerDescription}>{`${kanjiFrom} - ${kanjiTo}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={.3}
            style={styles.startButton}
            onPress={this.handleStart}
          >
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.3}
            style={styles.studyButton}
            onPress={this.handleStudy}
          >
            <Text style={styles.studyButtonText}>STUDY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

TestListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  kanjiFrom: PropTypes.number.isRequired,
  kanjiTo: PropTypes.number.isRequired,
  handleQuizStart: PropTypes.func.isRequired,
  handleScreenSwitchKanjiOverview: PropTypes.func.isRequired,
};

export default TestListEntry;
