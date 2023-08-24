import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#060b27',
    // paddingTop: 1000,
    // top
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
  optionsContainer: {
    marginTop: '15%',
    width: '100%',
    paddingLeft: '5%',
  },
  backButtonStyle: {
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  chatContainer: {
    position: 'absolute',

    left: 0,
    right: 0,
    backgroundColor: '#1f233d',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  micButtonContainer: {paddingLeft: '5%', marginRight: '2%'},
  micButtonImage: {width: 11, height: 20, right: 10},
  separator: {
    width: '70%',
    // height: 120,
    color: 'white',
    borderColor: 'white',
    borderRightWidth: 1,
  },
  sendButtonContainer: {paddingRight: '5%', marginLeft: '3%'},
  sendButtonImage: {width: 30, height: 20},
  modalMainContainer: {margin: 0},
  modalSecondaryContainer: {
    flex: 1,
    backgroundColor: '#060b27',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalChatMainContainer: {
    width: '75%',
    // paddingTop: '10%',
  },
  modalChatSecondaryContainer: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: 'rgba(211, 211, 211, 0.1)',
    alignSelf: 'flex-start',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: '20%',
    // top: 50,
  },
  newChatButtonContainer: {
    backgroundColor: '#7836ff',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5%',
    borderRadius: 35,
  },
  newChatButtonTextStyle: {color: 'white', fontSize: 16, letterSpacing: 1},
  selectedChatSession: {
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: 'rgba(210, 2, 0, 0.5)', // Apply a different background color for the selected chat session
  },
  chatButtonContainer: {alignSelf: 'flex-start'},
  cleanHistoryButtonContainer: {
    position: 'absolute',
    bottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cleanHistoryButtonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cleanHistoryButtonTextStyle: {color: 'white', fontSize: 16},
  modalMainContainerClose: {
    alignSelf: 'flex-end',
    width: '25%',
    height: '100%',
  },
  sessionModalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },

  sessionModalSecondaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },

  sessionModalContent: {
    flex: 1,
  },

  sessionModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  sessionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },

  sessionItemId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  sessionItemTimestamp: {
    fontSize: 14,
    color: 'gray',
  },

  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default styles;
