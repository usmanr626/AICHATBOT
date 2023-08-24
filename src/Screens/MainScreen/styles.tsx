import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0f054c',
  },
  headerContainer: {
    width: '100%',
    height: '33%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {width: '90%', height: '65%'},
  headerSubtext: {
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.8,
    lineHeight: 25,
  },
  mainScreenImageContainer: {
    width: '100%',
    flex: 1,
    bottom: '5%',
    height: '10%',
  },
  mainScreenImageStyle: {
    width: '100%',
    height: '100%',
  },
  marginBottom: {marginBottom: 30},
  headerSubtextContainer: {
    bottom: '3%',
    zIndex: 1,
    width: '100%',
  },
});

export default styles;
