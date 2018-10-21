import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import TestListEntry from '../../components/TestListEntry';
import testList from '../../constants/Config';
import styles from './styles';

class KanjiScreen extends React.Component {
  static navigationOptions = {
    title: 'Kanji Test Simulation',
  };

  constructor(props) {
    super(props);

    this.handleQuizStart = this.handleQuizStart.bind(this);
  }
  
  handleQuizStart(name, kanjiFrom, kanjiTo) {
    const { navigate } = this.props.navigation;
    navigate('Quiz', {title: name, kanjiFrom: kanjiFrom, kanjiTo: kanjiTo});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {testList.map(element => 
            <TestListEntry {...element} handleQuizStart={this.handleQuizStart}>
            </TestListEntry>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default KanjiScreen;