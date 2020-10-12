import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import KanjiScreen from '../screens/KanjiScreen';
import QuizScreen from '../screens/QuizScreen';
import KanjiOverviewScreen from '../screens/KanjiOverviewScreen';

export default KanjiStack = createStackNavigator({
  Kanji: KanjiScreen,
  Quiz: QuizScreen,
  KanjiOverview: KanjiOverviewScreen,
});

KanjiStack.navigationOptions = {
  tabBarLabel: 'Kanji',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
