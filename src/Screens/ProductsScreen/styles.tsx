import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#060b27',
  },
  bckGrndLeftImage: {
    width: '70%',
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  bckGrndLeftImageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: '30%',
  },
  bckGrndRightImage: {
    resizeMode: 'contain',
    width: '70%',
    alignSelf: 'stretch',
    marginLeft: '50%',
    marginTop: '30%',
  },
  bckGrndRightImageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonMainContainer: {
    backgroundColor: '#7836ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    top: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    letterSpacing: 1.5,
    fontSize: 26,
  },
});

export default styles;
