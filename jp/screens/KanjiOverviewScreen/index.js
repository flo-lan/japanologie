import React from 'react';
import PropTypes from 'prop-types';
import KanjiOverview from '../../components/KanjiOverview';

import { View } from 'react-native';

import styles from './styles';

class KanjiOverviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const { params: { kanjiFrom, kanjiTo } } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <KanjiOverview kanjiFrom={kanjiFrom} kanjiTo={kanjiTo} />
      </View>
    );
  }
}

export default KanjiOverviewScreen;
