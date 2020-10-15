import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FloatingAction } from "react-native-floating-action";

import KanjiBlock from '../KanjiBlock';
import kanjiList from '../../data/kanjiListStripped';

import styles from './styles';
import iconFilterRemove from '../../assets/images/filter-remove.png';
import iconFilter from '../../assets/images/filter-line.png';

const KANJI_PER_TAB = 100;

const FILTER_MEANING = "filter_meaning";
const FILTER_READING = "filter_reading";
const TEXT_ACTION_SHOW_MEANING = "Show Meaning";
const TEXT_ACTION_SHOW_READING = "Show Reading";
const TEXT_ACTION_HIDE_MEANING = "Hide Meaning";
const TEXT_ACTION_HIDE_READING = "Hide Reading";

class KanjiOverview extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.handleFilterPressed = this.handleFilterPressed.bind(this);
    this.state = {
      relevantKanji: [],
      cols: 5,
      filter: {
        meaning: false,
        reading: false,
      },
      actions: [
        {
          text: TEXT_ACTION_HIDE_MEANING,
          icon: iconFilterRemove,
          name: FILTER_MEANING,
          position: 1,
        },
        {
          text: TEXT_ACTION_HIDE_READING,
          icon: iconFilterRemove,
          name: FILTER_READING,
          position: 2,
        },
      ],
    };
  }

  componentDidMount() {
    const { kanjiFrom, kanjiTo } = this.props;

    const relevantKanji = kanjiList.slice(kanjiFrom - 1, kanjiTo);
    this.setState({ relevantKanji });
  }

  handleFilterPressed(name) {
    const { filter, actions } = this.state;
    if (name === FILTER_MEANING) {
      const show = filter.meaning;
      filter.meaning = !filter.meaning;
      actions[0].text = show ? TEXT_ACTION_HIDE_MEANING : TEXT_ACTION_SHOW_MEANING;
      actions[0].icon = show ? iconFilterRemove : iconFilter;
    } else if (name === FILTER_READING) {
      const show = filter.reading;
      filter.reading = !filter.reading;
      actions[1].text = show ? TEXT_ACTION_HIDE_READING : TEXT_ACTION_SHOW_READING;
      actions[1].icon = show ? iconFilterRemove : iconFilter;
    }

    this.setState({ filter, actions });
  }

  renderRow(kanjiRow, row) {
    const { filter } = this.state;
    return (
      <Row key={`row-${row}`}>
        {kanjiRow.map((kanji, col) => (
          <Col key={`col-${col}`} style={styles.blockContainer}>
            <KanjiBlock key={kanji.id} kanji={kanji} filter={filter} />
          </Col>
        ))}
      </Row>
    );
  }

  renderTab(kanjiTab, i) {
    const from = this.props.kanjiFrom + (i * KANJI_PER_TAB);
    const to = Math.min(this.props.kanjiTo, this.props.kanjiFrom + (i * KANJI_PER_TAB + KANJI_PER_TAB - 1));
    return (
      <Tab key={`tab-${i}`} heading={`${from}-${to}`}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Grid>
            {kanjiTab.map((kanjiRow, row) =>
              this.renderRow(kanjiRow, row)
            )}
            <Row key='row-extra' style={{ height: 56 + 30 }}/>
          </Grid>
        </ScrollView>
      </Tab>
    )
  }

  render() {
    const { relevantKanji, cols, actions } = this.state;
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
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {kanjiTabs.map((kanjiTab, i) => 
            this.renderTab(kanjiTab, i)
          )}
        </Tabs>
        <FloatingAction
            actions={actions}
            onPressItem={(name) => this.handleFilterPressed(name)}
          />
      </Container>
    );
  }
}

KanjiOverview.propTypes = {
  kanjiFrom: PropTypes.number.isRequired,
  kanjiTo: PropTypes.number.isRequired,
}

export default KanjiOverview;
