import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import KanjiBlock from '../KanjiBlock';
import kanjiList from '../../data/kanjiList';

import styles from './styles';

class KanjiOverview extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);

    this.state = {
      relevantKanji: [],
      cols: 5,
    };
  }

  componentDidMount() {
    const { kanjiFrom, kanjiTo } = this.props;
    const relevantKanji = kanjiList.slice(kanjiFrom - 1, kanjiTo);
    this.setState({ relevantKanji });
  }

  renderRow(kanjiRow) {
    return (
      <Row>
        {kanjiRow.map((kanji, i) => (
          <Col style={styles.blockContainer}>
            <KanjiBlock kanji={kanji} />
          </Col>
          )
        )}
      </Row>
    );
  }

  render() {
    const { relevantKanji, cols } = this.state;
    kanjiRows = [];
    relevantKanji.forEach((kanji, i) => {
      let row = Math.floor(i / cols);
      if (kanjiRows.length <= row) {
        kanjiRows[row] = [];
      }
      kanjiRows[row].push(kanji);
    });
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Grid>
          {kanjiRows.map((kanjiRow, i) => 
            this.renderRow(kanjiRow)
          )}
        </Grid>
      </ScrollView>
    );
  }
}

KanjiOverview.propTypes = {
  kanjiFrom: PropTypes.number.isRequired,
  kanjiTo: PropTypes.number.isRequired,
}

export default KanjiOverview;