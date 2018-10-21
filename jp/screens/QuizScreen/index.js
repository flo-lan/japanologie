import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import _ from 'lodash';

import kanjiList from '../../data/kanjiList';
import { totalQuestions } from '../../constants/Config';
import KanjiCard from '../../components/KanjiCard';
import styles from './styles';

class QuizScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  constructor(props) {
    super(props);

    this.pickRandomKanji = this.pickRandomKanji.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);

    const { params } = this.props.navigation.state;
    const kanjiFrom = params.kanjiFrom;
    const kanjiTo = params.kanjiTo;

    this.state = {
      curQuestion: 1,
      points: 0,
      kanjiFrom,
      kanjiTo,
      pickedKanji: [],
    }
  }

  componentDidMount() {
    this.pickRandomKanji();
  }

  pickRandomKanji() {
    const { kanjiFrom, kanjiTo } = this.state;
    // kanjiTo index is not included in result
    const relevantKanji = kanjiList.slice(kanjiFrom - 1, kanjiTo);
    // shuffle and pick totalQuestion amount of now random kanji
    const pickedKanji = _.shuffle(relevantKanji).slice(0, totalQuestions);
    this.setState({
      pickedKanji,
    });
  }

  handleAnswer(points) {
    const { pickedKanji, curQuestion } = this.state;
    const curPoints = this.state.points;
    // remove first element
    pickedKanji.shift();
    this.setState({
      points: curPoints + points,
      pickedKanji,
      curQuestion: curQuestion + 1,
    });
  }

  render() {
    const { pickedKanji, curQuestion, points } = this.state;
    const showKanjiCard = pickedKanji.length > 0;
    let percentage;
    let percentageStyle = [styles.percentage];
    if (!showKanjiCard) {
      percentage = (points / (3 * totalQuestions) * 100).toFixed(2);
      if (percentage >= 60) {
        percentageStyle.push(styles.positive);
      } else {
        percentageStyle.push(styles.negative);
      }
    }
  
    return(
      <View style={styles.container}>
        { showKanjiCard &&
          <KanjiCard 
            curQuestion={curQuestion}
            curKanji={pickedKanji[0]}
            handleAnswer={this.handleAnswer}
          />
        }
        { !showKanjiCard &&
          <View style={styles.result}>
            <Text style={percentageStyle}>
              {`${percentage}%`}
            </Text>
            <Text style={styles.calulcatedPoints}>
            {`${points}/${3 * totalQuestions} Punkte`}
            </Text>
          </View>
        }
      </View>
    );
  }
}

export default QuizScreen;