import {firebase} from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  AdEventType,
  AppOpenAd,
  MobileAds,
  TestIds,
} from 'react-native-google-mobile-ads';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import ChatScreen from './src/Screens/ChatScreen/ChatScreen';
import {MainScreen} from './src/Screens/MainScreen';
import {SettingsScreen} from './src/Screens/SettingsScreen';

import remoteConfig from '@react-native-firebase/remote-config';
import {ProductsScreen} from './src/Screens/ProductsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // remoteConfig().setDefaults({
  //   ads_enabled: true, // Default value for ads
  // });

  const askPermission = async () => {
    await requestTrackingPermission();
  };

  useEffect(() => {
    askPermission();
    try {
      firebase.analytics();
      firebase.analytics().logEvent('app_start', {});
      // console.log('FIREBASE ANALYTICS CONFIGURED');
    } catch (error) {
      // console.log('FIREBASE ANALYTICS CONFIGURATION ERROR');
    }

    try {
      MobileAds()
        .initialize()
        .then(adapterStatuses => {
          // console.log('GOOGLE ADS INIT');
        });
    } catch (error) {
      // console.log('GOOGLE ADS INIT ERROR');
    }

    const adsInspector = async () => {
      try {
        await MobileAds().openAdInspector();
        // The promise will resolve when the inspector is closed.
        console.log('AD INSPECTOR OPEN');
      } catch (error) {
        // The promise will reject if ad inspector is closed due to an error.
        console.log('AD INSPECTOR ERROR', error);
        // console.log(error);
      }
    };

    // adsInspector();
  }, []);

  // useEffect(() => {
  //   // Initialize Firebase Remote Config (You might have already done this)
  //   async function initializeRemoteConfig() {
  //     try {
  //       // Configure Remote Config settings
  //       await remoteConfig().setConfigSettings({
  //         minimumFetchIntervalMillis: 0, // Set to 0 for no caching during development
  //         // Other Remote Config settings
  //       });

  //       // Fetch and activate the latest remote config values
  //       await remoteConfig().fetchAndActivate();
  //     } catch (error) {
  //       console.error('Error initializing Firebase Remote Config:', error);
  //     }
  //   }

  //   // Call the initialization function
  //   initializeRemoteConfig();
  // }, []); // This useEffect runs once when the component mounts

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
