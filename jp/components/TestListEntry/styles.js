import { StyleSheet } from 'react-native';
import Platform from 'Platform';

export default styles = StyleSheet.create({
  listEntry: {
    padding: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  headerTitle: {
    padding: 10,
  },
  headerDescription: {
    padding: 10,
  },
  startButton: {
    backgroundColor: '#2196f3',
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    elevation: 4,
    padding: 8,
  },
  startButtonText: {
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