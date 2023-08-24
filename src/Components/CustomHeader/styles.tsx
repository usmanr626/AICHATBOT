import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonStyle: {
    position: 'absolute',
    zIndex: 1,
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 1,
  },
  headerContainerStyle: {
    width: '100%',
    alignItems: 'center',
  },
});
export default styles;
