import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Button } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import KanjiBlock from '../KanjiBlock';
import kanjiList from '../../data/kanjiList';

import styles from './styles';

const KANJI_PER_TAB = 100;

class KanjiOverview extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.state = {
      relevantKanji: [],
      cols: 5,
      activeTab: 0,
      initialTab: 0,
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

  renderTab(kanjiTab, i) {
    const from = this.props.kanjiFrom + (i * KANJI_PER_TAB);
    const to = Math.min(this.props.kanjiTo, this.props.kanjiFrom + (i * KANJI_PER_TAB + KANJI_PER_TAB - 1));
    return (
      <Tab heading={`${from}-${to}`}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Grid>
          {kanjiTab.map(kanjiRow => 
            this.renderRow(kanjiRow)
          )}
          </Grid>
        </ScrollView>
      </Tab>
    )
  }

  render() {
    const { relevantKanji, cols } = this.state;
    let kanjiRows = [];
    relevantKanji.forEach((kanji, i) => {
      let row = Math.floor(i / cols);
      if (kanjiRows.length <= row) {
        kanjiRows[row] = [];
      }
      kanjiRows[row].push(kanji);
    });

    let i = 0;
    let kanjiTabs = [];
    kanjiRows.forEach(kanjiRow => {
      i += kanjiRow.length;
      let tab = Math.floor((i - 1) / KANJI_PER_TAB);
      if (kanjiTabs.length <= tab) {
        kanjiTabs[tab] = [];
        // TODO: in uneven breaks split row between tabs
      }

      kanjiTabs[tab].push(kanjiRow);
    });

    return (
      // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //   <Grid>
      //     {kanjiRows.map((kanjiRow, i) => 
      //       this.renderRow(kanjiRow)
      //     )}
      //   </Grid>
      // </ScrollView>
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {kanjiTabs.map((kanjiTab, i) => 
            this.renderTab(kanjiTab, i)
          )}
        </Tabs>
      </Container>
    );
  }
}

KanjiOverview.propTypes = {
  kanjiFrom: PropTypes.number.isRequired,
  kanjiTo: PropTypes.number.isRequired,
}

export default KanjiOverview;