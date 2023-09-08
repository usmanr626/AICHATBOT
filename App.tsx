import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {MainScreen} from './src/Screens/MainScreen';
import {SettingsScreen} from './src/Screens/SettingsScreen';
import ChatScreen from './src/Screens/ChatScreen/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAdEventType,
  BannerAdSize,
  RewardedAd,
  BannerAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {firebase} from '@react-native-firebase/analytics';

import remoteConfig from '@react-native-firebase/remote-config';

const Stack = createNativeStackNavigator();

const App = () => {
  const fetchRemoteConfig = async () => {
    try {
      await remoteConfig().fetchAndActivate(); // Fetch and activate the config
      const adsEnabled = remoteConfig().getValue('ads_enabled').asBoolean();
      return adsEnabled;
    } catch (error) {
      console.error('Error fetching remote config:', error);
      return false; // Default to false if there's an error
    }
  };

  remoteConfig().setDefaults({
    ads_enabled: true, // Default value for ads
  });
  const adUnitIdA = TestIds.APP_OPEN;

  const showOpenAppAdd = () => {
    const appOpenAd = AppOpenAd.createForAdRequest(adUnitIdA, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        appOpenAd.show();
      },
    );

    appOpenAd.load();
  };
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

  // useEffect(() => {
  //   const checkMicPermission = async () => {
  //     const hasPermission = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //     );
  //     console.log('Microphone permission status:', hasPermission);
  //   };

  //   checkMicPermission();
  // }, []);

  const askPermission = async () => {
    const trackingStatus = await requestTrackingPermission();
  };

  useEffect(() => {
    askPermission();
    try {
      firebase.analytics();
      firebase.analytics().logEvent('app_start', {});
      console.log('FIREBASE ANALYTICS CONFIGURED');
    } catch (error) {
      console.log('FIREBASE ANALYTICS CONFIGURATION ERROR');
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
