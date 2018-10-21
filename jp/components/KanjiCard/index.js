import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './styles';
import { totalQuestions } from '../../constants/Config';

class KanjiCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.renderONReadings = this.renderONReadings.bind(this);
    this.renderKUNReadings = this.renderKUNReadings.bind(this);
    this.renderMeaning = this.renderMeaning.bind(this);

    this.state = {
      showAnswer: false,
    }
  }

  handleAnswer(points) {
    const { handleAnswer } = this.props;
    this.setState({
      showAnswer: false,
    });
    handleAnswer(points);
  }

  handleShow() { 
    this.setState({
      showAnswer: true,
    });
  }

  renderONReadings(curKanji) {
    return(
      <View style={{flex:1}}>
        <Text style={styles.headline}>
          ON
        </Text>
        <Text style={styles.text}>
          {curKanji.on1}
        </Text>
        {this.renderMeaning(curKanji.on1Bedeutung)}
        <Text style={styles.text}>
          {curKanji.on2}
        </Text>
        {this.renderMeaning(curKanji.on2Bedeutung)}
      </View>
    );
  }

  renderKUNReadings(curKanji) {
    return(
      <View style={{flex:1}}>
        <Text style={styles.headline}>
          KUN
        </Text>
        <Text style={styles.text}>
          {curKanji.kun1}
        </Text>
        {this.renderMeaning(curKanji.kun1Bedeutung)}
        <Text style={styles.text}>
          {curKanji.kun2}
        </Text>
        {this.renderMeaning(curKanji.kun2Bedeutung)}
        <Text style={styles.text}>
          {curKanji.kun3}
        </Text>
        {this.renderMeaning(curKanji.kun3Bedeutung)}
      </View>
    );
  }

  renderMeaning(meaning) {
    if (meaning && meaning !== ' ') {
      return (
        <View>
          <Text style={styles.text}>
            {`(${meaning})`}
          </Text>
         </View>
      );
    }

    return null;
  }
  
  render() {
    const { handleAnswer, curQuestion, curKanji } = this.props;
    const { showAnswer } = this.state;

    return (
      <View style={styles.container}>
       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.questionCounter}>
            {`${curQuestion} / ${totalQuestions}`}
          </Text>
          <Text style={styles.kanji}>
            {curKanji.symbol}
          </Text>
          { showAnswer && 
            <View>
              <View style={styles.divider} />
              <Text style={styles.headline}>
                Radikal
              </Text>
              <Text style={styles.text}>
                {curKanji.radical}
              </Text>
              <Text style={styles.headline}>
                Bedeutung
              </Text>
              <Text style={styles.text}>
                {curKanji.bedeutung}
              </Text>
              <View style={styles.readingContainer}>
                {this.renderKUNReadings(curKanji)}
                {this.renderONReadings(curKanji)}
              </View>
            </View>
          }
        </ScrollView>
        { !showAnswer && 
          <TouchableOpacity
            activeOpacity={.3} 
            style={styles.showButton}
            onPress={this.handleShow}
          >
            <Text style={styles.buttonText}>SHOW</Text>
          </TouchableOpacity>
        }
        { showAnswer && 
          <View style={styles.pointsContainer}>
            <TouchableOpacity
              activeOpacity={.3} 
              style={[styles.pointButton, styles.point0Button]}
              onPress={() => this.handleAnswer(0)}
            >
              <Text style={styles.buttonText}>0P</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={.3} 
              style={[styles.pointButton, styles.point1Button]}
              onPress={() => this.handleAnswer(1)}
            >
              <Text style={styles.buttonText}>1P</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={.3} 
              style={[styles.pointButton, styles.point2Button]}
              onPress={() => this.handleAnswer(2)}
            >
             <Text style={styles.buttonText}>2P</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={.3} 
              style={[styles.pointButton, styles.point3Button]}
              onPress={() => this.handleAnswer(3)}
            >
              <Text style={styles.buttonText}>3P</Text>
            </TouchableOpacity>
        </View>
        }
      </View>
    );
  }
}

KanjiCard.propTypes = {
  curQuestion: PropTypes.number.isRequired,
  curKanji: PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired,
}

export default KanjiCard;