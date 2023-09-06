import AsyncStorage from '@react-native-async-storage/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import Voice from '@react-native-voice/voice';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import Modal from 'react-native-modal';
import {CONSTANTS} from '../../Assets/Constants';
import {IMAGES} from '../../Assets/Images';
import {LABELS} from '../../Assets/Labels';
import {ChatScreenHeader} from '../../Components/ChatScreenHeader';
import styles from './styles';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'ios'
  ? 'ca-app-pub-4161728863134324/4040155771'
  : 'ca-app-pub-4161728863134324/7479555950';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

type ChatScreenPropTypes = {
  navigation: any;
};

type ChatMessage = {
  role: string;
  content: string;
};

const ChatScreen = ({navigation}: ChatScreenPropTypes) => {
  const flatListRef = useRef(null);
  //
  const isAndroid = Platform.OS === 'android';
  const [text, setText] = useState('');
  const [showSideModal, setShowSideModal] = useState(false);
  const [suggestionModal, setSuggestionModal] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const apiUrl = CONSTANTS.API_URL;
  const apiKey = CONSTANTS.API_KEY;

  const [result, setResult] = useState<any>('');
  console.log('🚀 ~ file: ChatScreen.tsx:64 ~ ChatScreen ~ result:', result);
  const [error, setError] = useState<any>('');
  const [isRecording, setIsRecording] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isSending, setIsSending] = useState(false); // New state variable for activity indicator
  const [loading, setLoading] = useState(false); // Initially, show the loading indicator
  // Inside your ChatScreen component
  const [selectedCategory, setSelectedCategory] = useState('');
  const [lowerFlatListData, setLowerFlatListData] = useState([]);
  const [selectedChatSession, setSelectedChatSession] = useState(null);
  const [saveSession, setSaveSession] = useState(false);
  const [chatSessionName, setChatSessionName] = useState([]);

  // remoteConfig().setDefaults({
  //   ads_enabled: true, // Default value for ads
  // });

  // PERMISSIONS

  // useEffect(() => {
  //   const requestCameraPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         {
  //           title: 'Mic Permission',
  //           message: 'Mic Permission.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the Mic');
  //       } else {
  //         console.log('Mic permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };

  //   requestCameraPermission();
  // }, []);

  useEffect(() => {
    const checkMicPermission = async () => {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      console.log('Microphone permission status:', hasPermission);
    };

    // checkMicPermission();
  }, []);

  useEffect(() => {
    const getInitialCategoryData = async () => {
      if (suggestionsCategoryData.length > 0) {
        setSelectedCategory(suggestionsCategoryData[0].message);
        setLowerFlatListData(
          lowerFlatListDataMap[suggestionsCategoryData[0].message] || [],
        );
      }
    };

    getInitialCategoryData();
  }, []);

  useEffect(() => {
    loadSavedChatSessions(); // Load chat sessions when component mounts
  }, [questionsAsked]);

  const suggestionsCategoryData = [
    {message: 'Interview'},
    {message: 'BusinessAssistant'},
    {message: 'Developer'},
    {message: 'Advertiser'},
    // Add more categories as needed
  ];

  const lowerFlatListDataMap = {
    Interview: [
      {message: 'What are the most common interview questions'},
      {message: 'How do I prepare for an interview?'},
      {message: 'What are the best interview questions to ask candidates?'},
      {message: 'How do I conduct a successful job interview'},
      {message: `How do I evaluate a candidate's skills and qualifications`},
      {message: 'How do I determine the cultural fit of a candidate?'},
    ],
    BusinessAssistant: [
      {message: 'What are the responsibilities of a business assistant?'},
      {message: 'How do I become a successful business assistant?'},
      {message: 'What skills are required for a business assistant?'},
      {message: 'What are the best tools and software for business assistant?'},
      {message: 'What is the role of a virtual business assistant?'},
      {
        message:
          'How do I improve my organizatinal skills as a business assistant?',
      },
    ],
    Developer: [
      {message: 'What programming language should I learn?'},
      {message: 'What is Agile development and how does it work?'},
      {
        message:
          'What are the best resources for learning software development',
      },
      {message: 'What are the most in-demand programming skills?'},
      {message: 'How do I get started as a developer?'},
      {message: 'What is DevOps and how does it relate to development?'},
    ],
    Advertiser: [
      {message: 'What is advertising and how does it work?'},
      {message: 'What are the different types of advertising?'},
      {message: 'How do I create a successful advertising campaign'},
      {message: 'What are the most effective channels for advertising'},
      {message: 'How do I measure the success of an advertising campaign'},
      {message: 'What are the best tools and softwares for advertising?'},
    ],
    // Add more data for each category as needed
  };

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        setLoading(false);
        setQuestionsAsked(0);
        // setText('');
        Alert.alert(
          'Thank you for watching the ad',
          'you can continue with your search now!',
        );
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [questionsAsked]);

  // ads Logic

  useEffect(() => {
    const loadQuestionsAsked = async () => {
      try {
        const questionsAskedValue = await AsyncStorage.getItem(
          'questionsAsked',
        );
        if (questionsAskedValue) {
          setQuestionsAsked(Number(questionsAskedValue));
        }
      } catch (error) {
        console.error('Error loading questions asked value:', error);
      }
    };
    loadQuestionsAsked();
  }, []);

  Voice.onSpeechStart = () => setIsRecording(true);
  // Voice.onSpeechEnd = () => stopRecording();
  Voice.onSpeechError = error => setError(error?.error);
  // Voice.onSpeechResults = result => setResult(result.value[0]);
  Voice.onSpeechResults = event => {
    console.log('Voice.onSpeechResults:', event);
    const recognized = event?.value[0];
    setResult(recognized);
  };

  const requestAudioRecordingPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('ANDROID PERMISSION GRANTED');
        } else {
          console.log('ANDROID PERMISSION NOT GRANTED');
        }
      }
    } catch (error) {
      console.error('Error requesting audio recording permission: ', error);
    }
  };

  useEffect(() => {
    // requestAudioRecordingPermission();
  }, []);

  const loadSavedChatSessions = async () => {
    try {
      const existingChatSessions = await AsyncStorage.getItem('chatSessions');
      if (existingChatSessions) {
        const chatSessions = JSON.parse(existingChatSessions);
        setChatSessions(chatSessions);

        // Set the first chat session as selected by default
        if (chatSessions.length > 0) {
          setSelectedChatSession(chatSessions[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const startNewChat = async () => {
    console.log('index 0 ', chatSessionName[0]);
    console.log('index 1 ', chatSessionName[1]);
    console.log('index 2 ', chatSessionName[2]);
    console.log('index 3 ', chatSessionName[3]);
    console.log('index 4 ', chatSessionName[4]);
    console.log('index 5 ', chatSessionName[5]);
    console.log('index 6 ', chatSessionName[6]);

    setChatHistory([]);
    setText('');
    setResult('');
    setUnsavedChanges(false);
    setShowSideModal(false);

    // Generate a timestamp to use as the chat session name
    const timestamp = new Date().toISOString();

    // await saveChatSession(chatSessionName[1]);
    if (chatSessionName.length > 0) {
      await saveChatSession(chatSessionName[0]);
    }
    loadSavedChatSessions();

    setChatSessionName([]);
  };

  const cleanHistory = async () => {
    try {
      // Clear the chat history in AsyncStorage
      await AsyncStorage.removeItem('chatHistory');
      console.log('Chat history cleared.');

      // Clear the previous chat history in AsyncStorage
      await AsyncStorage.removeItem('previousChatHistory');
      console.log('Previous chat history cleared.');

      // Clear all chat sessions in AsyncStorage
      await AsyncStorage.removeItem('chatSessions');
      console.log('All chat sessions cleared.');

      // Clear the chat sessions state
      setChatSessions([]);
      Alert.alert('History Cleaned');
    } catch (error) {
      console.error('Error clearing chat data:', error);
    }

    // Clear the chat history state and reset the text input
    setChatHistory([]);
    setText('');
    setResult('');
    setShowSideModal(false);
  };

  const saveChatSession = async (chatSessionName: string | undefined) => {
    console.log('SAVING CHAT SESSION NAME:', chatSessionName);

    try {
      // Create a new chat session object
      const newChatSession = {
        id: chatSessionName,
        history: chatHistory,
      };

      // Retrieve the existing chat sessions from AsyncStorage
      const existingChatSessions = await AsyncStorage.getItem('chatSessions');
      const chatSessions = existingChatSessions
        ? JSON.parse(existingChatSessions)
        : [];

      // Add the new chat session to the array of chat sessions
      chatSessions.push(newChatSession);

      // Save the updated chat sessions array to AsyncStorage
      await AsyncStorage.setItem('chatSessions', JSON.stringify(chatSessions));

      console.log('Chat session saved:', newChatSession);
    } catch (error) {
      console.error('Error saving chat session:', error);
    }
  };

  const loadChatSession = chatSession => {
    // Set the chat history to the selected chat session's history

    setChatHistory(chatSession.history);

    // Set the selected chat session
    setSelectedChatSession(chatSession.id);

    // Close the modal after loading the session
    setShowSideModal(false);

    // Reset the unsavedChanges flag as the chat session has been loaded
    setUnsavedChanges(false);
  };

  const startRecording = async () => {
    setIsRecording(true);
    console.log('Start');
    setText('');
    setResult('');
    try {
      await Voice.start('en_US', {
        RECOGNIZER_ENGINE: 'GOOGLE',
        EXTRA_PARTIAL_RESULTS: true,
      });
      Voice.onSpeechPartialResults = partialResults => {
        console.log(
          '🚀 ~ file: ChatScreen.tsx:414 ~ startRecording ~ partialResults:',
          partialResults,
        );
        if (partialResults.value && partialResults.value.length > 0) {
          setResult(partialResults.value[0]); // Update the result with the partial speech
          console.log(
            '🚀 ~ file: ChatScreen.tsx:421 ~ startRecording ~ partialResults.value[0]:',
            partialResults.value[0],
          );
        }
      };
    } catch (error) {
      setError(error);
      console.log('ERROR');
    } finally {
      setIsRecording(false);
    }

    // stopRecording();
  };

  const stopRecording = async () => {
    setIsRecording(false);
    console.log('Stopping');

    try {
      Voice.removeAllListeners(); // Remove the listener for partial results
      await Voice.stop();
      setText(result);
      setResult(result);
      console.log('RESULT RECORDING: ', result);
    } catch (error) {
      setError(error);
      console.log('ERROR');
    }
  };
  // const stopRecording = async () => {
  //   setIsRecording(false);
  //   console.log('Stopping');

  //   try {
  //     await Voice.stop();
  //     setText(result);
  //     console.log('REUSLT RECORDING: ', result);
  //   } catch (error) {
  //     setError(error);
  //     console.log('ERROR');
  //   }
  // };

  // const showRewardedAd = async () => {
  //   const adsEnabled = await fetchRemoteConfig();

  //   if (adsEnabled) {
  //     // Show ads
  //     rewarded.show();
  //   } else {
  //     // Don't show ads
  //     setLoading(false);
  //   }
  // };

  const handleSend = async () => {
    setIsRecording(false);
    console.log('Sednign', text);
    console.log('Sednign', result);

    // Check if the message is empty
    if (isAndroid ? result.trim() === '' : result.trim() === '') {
      return; // Do nothing if the message is empty
    }
    if (questionsAsked >= 4222) {
      Alert.alert(
        'Limit reached',
        'you can extend your limit by watching an ad',
        [
          {
            text: 'Watch Ad',
            onPress: () => {
              setLoading(true),
                setTimeout(() => {
                  try {
                    // rewarded.load();
                    rewarded.show();
                    // showRewardedAd();
                  } catch (error) {
                    Alert.alert(
                      'No Ads',
                      'No ads to show currently, please try again in a while',
                      [
                        {
                          text: 'Ok',
                          onPress: () => setQuestionsAsked(0),
                        },
                      ],
                    );
                    setLoading(false);
                  }

                  // setLoading(false);
                }, 10000);
            },
            // onPress: () => {
            //   setLoading(true);
            //   rewarded.show();
            // },

            style: 'default',
          },
          {
            text: 'Cancel',
            onPress: () => console.log('OK Pressed'),
            style: 'destructive',
          },
        ],
      );
      return;
    }
    const systemMessage = {
      role: 'system',
      content: 'You are chatting with the AI.',
    };
    const userMessage = {role: 'user', content: result};

    const messages = [...chatHistory, systemMessage, userMessage].map(
      message => ({
        role: message.role,
        content: message.content,
      }),
    );
    console.log('Formatted Messages:', messages); // Log the formatted messages

    try {
      setIsSending(true); // Show the activity indicator
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
          }),
        },
      );

      const data = await response.json();
      console.log('API Response:', data);

      if (data.choices && data.choices.length > 0) {
        // ...

        // Create a new bot message
        const botMessage = {
          role: 'assistant',
          content: data.choices[0].message.content,
        };

        // Update the user and bot messages with correct content
        userMessage.content = result;
        botMessage.content = data.choices[0].message.content;

        // Update chat history with user and bot messages
        const updatedChatHistory = [...chatHistory, userMessage, botMessage];
        setChatHistory(updatedChatHistory);
        setText('');
        setResult('');
        // Save the chat session after sending the message
        //dont save chat session here
        // await saveChatSession(userMessage.content);
        //dont save chat session here
        console.log('USER MESSAGE ', userMessage);
        console.log('USER MESSAGE CONTENT', userMessage.content);

        setChatSessionName([...chatSessionName, userMessage.content]);

        console.log('THIS ARRAY now: ', chatSessionName);

        // {
        //   saveSession &&
        //     setChatSessions(prevChatSessions => [
        //       ...prevChatSessions,
        //       {id: userMessage.content, history: updatedChatHistory},
        //     ]);
        // }

        // ...
      } else {
        console.error('Invalid API response:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }

    setQuestionsAsked(questionsAsked + 1); // Increment the count of questions asked
    await AsyncStorage.setItem('questionsAsked', String(questionsAsked + 1));
    flatListRef.current.scrollToEnd({animated: true});

    // ... (rest of the code)
    // saveOnEverySend();
    // await saveThisChat();
  };

  // useEffect(() => {
  //   const saveChatOnUnmount = async () => {
  //     await saveThisChat();
  //   };
  //   return () => {
  //     saveChatOnUnmount();
  //   };
  // }, []);

  const getChatSessionName = (chatSession: any) => {
    return chatSession.id || 'Your Chat';
  };

  const onChangeText = (inputText: string) => {
    setResult(inputText);
    setUnsavedChanges(true);
  };

  const onSettingsPressed = () => {
    navigation.navigate('SettingsScreen');
  };

  useEffect(() => {
    const getServices = async () => {
      if (Platform.OS === 'android') {
        const service = await Voice.getSpeechRecognitionServices();
        console.log('services received: ', service);
      }
    };
    getServices(); // Call the getServices function inside useEffect to execute it on mount
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCategorySelection = category => {
    setSelectedCategory(category);
    setLowerFlatListData(lowerFlatListDataMap[category] || []);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={IMAGES.bgLeft}
        imageStyle={styles.bckGrndLeftImage}
        style={styles.bckGrndLeftImageContainer}
      />
      <ImageBackground
        source={IMAGES.bgRight}
        imageStyle={styles.bckGrndRightImage}
        style={styles.bckGrndRightImageContainer}
      />
      <ChatScreenHeader
        onSettingsPress={() => onSettingsPressed()}
        // onMutePress={() => showInterAd()}
        onMutePress={() => console.warn('Mute')}
        onMenuPress={() => setShowSideModal(true)}
      />
      <View
        style={{
          backgroundColor: null,
          width: '90%',
          height: '15%',
          marginTop: '5%',
          alignItems: 'center',
          marginBottom: isKeyboardOpen ? '10%' : null,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>
          Hi! you can send your message or get inspired from suggestions
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#7836ff',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            top: 20,
            height: 40,
            width: '60%',
          }}
          onPress={() => setSuggestionModal(!suggestionModal)}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Suggestions</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={chatHistory}
        style={{
          width: '90%',
          marginBottom: Platform.OS === 'ios' ? '20%' : '35%',
          marginTop: '5%',
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              marginBottom: '2%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: item.role === 'user' ? 'white' : '#7836ff',
              }}>
              {item.role === 'user' ? 'You: ' : 'Bot: '}
            </Text>
            <Text style={{fontSize: 16, color: 'white'}}>{item.content}</Text>
          </View>
        )}
      />

      <View
        style={{
          ...styles.chatContainer,
          bottom:
            Platform.OS === 'android' ? '5%' : isKeyboardOpen ? '50%' : '5%',
        }}>
        <Pressable
          style={styles.micButtonContainer}
          // onPress={() =>
          //   Platform.OS === 'android'
          //     ? Alert.alert('This feature will be available on our next update')
          //     : isRecording
          //     ? stopRecording()
          //     : startRecording()
          // }
          onPress={() => (isRecording ? stopRecording() : startRecording())}>
          <Image
            source={IMAGES.micButton}
            resizeMode="contain"
            style={{
              ...styles.micButtonImage,
              tintColor: isRecording ? 'red' : 'white',
            }}
          />
        </Pressable>

        <TextInput
          style={styles.separator}
          placeholder="Write your message..."
          placeholderTextColor={'white'}
          value={result}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          // onPress={() => showAdd()}
          onPress={() => handleSend()}
          disabled={isSending} // Disable the button when API call is in progress
        >
          {isSending ? ( // Show ActivityIndicator when API call is in progress
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Image
              source={IMAGES.sendButton}
              resizeMode="contain"
              style={styles.sendButtonImage}
            />
          )}
        </TouchableOpacity>

        <Modal
          isVisible={showSideModal}
          style={styles.modalMainContainer}
          animationIn="slideInLeft"
          animationOut="slideOutLeft">
          <Pressable style={styles.modalSecondaryContainer}>
            <ImageBackground
              source={IMAGES.bgLeft}
              imageStyle={styles.bckGrndLeftImage}
              style={styles.bckGrndLeftImageContainer}
            />
            <ImageBackground
              source={IMAGES.bgRight}
              imageStyle={styles.bckGrndRightImage}
              style={styles.bckGrndRightImageContainer}
            />
            <View style={styles.modalChatMainContainer}>
              <View style={styles.modalChatSecondaryContainer}>
                <SafeAreaView />
                <TouchableOpacity
                  onPress={() => startNewChat()}
                  style={styles.newChatButtonContainer}>
                  <Text style={styles.newChatButtonTextStyle}>
                    {LABELS.newChat}
                  </Text>
                </TouchableOpacity>
                <ScrollView
                  style={{width: '100%'}}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {chatSessions.map(chatSession => (
                    <TouchableOpacity
                      key={chatSession.id}
                      onPress={() => loadChatSession(chatSession)}
                      style={[
                        styles.chatButtonContainer,
                        chatSession.id === selectedChatSession &&
                          styles.selectedChatSession,
                      ]}>
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(210, 210, 210, 0.2)',
                          marginVertical: 10,
                          padding: 10,
                          borderRadius: 20,
                          borderWidth:
                            chatSession.id === selectedChatSession ? 3 : 0,
                          borderColor:
                            chatSession.id === selectedChatSession
                              ? '#7836ff'
                              : null,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          {getChatSessionName(chatSession)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Clean chat history',
                      'Are you sure? All saved data will be lost',
                      [
                        {
                          text: 'Cancel',

                          style: 'destructive',
                        },
                        {text: 'Clean History', onPress: () => cleanHistory()},
                      ],
                    )
                  }
                  style={styles.cleanHistoryButtonContainer}>
                  <Image
                    source={IMAGES.cleanHistory}
                    style={styles.cleanHistoryButtonImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.cleanHistoryButtonTextStyle}>
                    {LABELS.cleanHistory}
                  </Text>
                </TouchableOpacity>
                <View style={{bottom: 20}}>
                  <Text
                    style={{fontSize: 12, color: 'white', letterSpacing: 1}}>
                    {LABELS.Version}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => setShowSideModal(false)}
              style={styles.modalMainContainerClose}></Pressable>
          </Pressable>
        </Modal>
      </View>

      <Modal
        isVisible={loading}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '##060b27',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <Text style={{color: 'white', fontSize: 22, fontWeight: '600'}}>
          {LABELS.adLoading}
        </Text>
      </Modal>

      <Modal
        onBackdropPress={() => setSuggestionModal(!suggestionModal)}
        isVisible={suggestionModal}
        style={{top: '10%', justifyContent: 'center'}}
        animationIn="slideInUp">
        <View
          style={{
            backgroundColor: 'black',
            width: '100%',
            height: '70%',
            borderRadius: 20,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            horizontal
            data={suggestionsCategoryData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleCategorySelection(item.message)}
                style={{
                  backgroundColor: '#7836ff',
                  // flexDirection: 'row',
                  // marginVertical: '5%',
                  marginBottom: '10%',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 15,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {item.message}
                </Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={lowerFlatListData}
            style={{
              width: '90%',
              marginVertical: '5%',
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setText(item.message),
                    setResult(item.message),
                    setSuggestionModal(!suggestionModal);
                }}
                style={{
                  backgroundColor: 'grey',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  marginBottom: '10%',
                  justifyContent: 'center',
                  // height: 40,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {item.message}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ChatScreen;
