import { StyleSheet } from 'react-native';
import Platform from 'Platform';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  questionCounter: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  kanji: {
    textAlign: 'center',
    fontSize: 60,
  },
  headline: {
    textAlign: 'center',
    fontWeight: "700",
    fontSize: 18,
    padding: 6,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: 'center',
  },
  readingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showButton: {
    backgroundColor: '#808080',
    padding: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointButton: {
    flex:1,
    backgroundColor: '#808080',
    padding: 12,
    borderColor: '#000000',
  },
  pointButtonInside: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  buttonText: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        color: '#007AFF',
        fontSize: 18,
      },
      android: {
        color: 'white',
        fontWeight: '500',
      },
    }),
  },
});