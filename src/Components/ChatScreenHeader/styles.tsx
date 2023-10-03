import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  menuButtonImageStyle: {width: 35, height: 30},
  // textContainer: {marginLeft: '1%'},
  textStyle: {color: 'white', fontSize: 20},
  muteButtonImageStyle: {width: 35, height: 30, left: '50%'},
  settingsButtonImageStyle: {width: 35, height: 30},
});

export default styles;
