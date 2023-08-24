import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import {CustomTextButton} from '../../Components/CustomTextButton';
import styles from './styles';
import {LABELS} from '../../Assets/Labels';
import {useIsFocused} from '@react-navigation/native';

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import remoteConfig from '@react-native-firebase/remote-config';

// const adUnitId = TestIds.INTERSTITIAL;

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
  ? `ca-app-pub-4161728863134324/2377302896`
  : 'ca-app-pub-4161728863134324/3758972213';

// const adUnitId =
// Platform.OS === 'android'
//   ? `ca-app-pub-4161728863134324/2377302896`
//   : 'ca-app-pub-4161728863134324/3758972213';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

type MainScreenPropTypes = {
  navigation: any;
};
const MainScreen = ({navigation}: MainScreenPropTypes) => {
  const isFocused = useIsFocused();

  const [loaded, setLoaded] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  remoteConfig().setDefaults({
    ads_enabled: true, // Default value for ads
  });

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

  useEffect(() => {
    if (isFocused) {
      interstitial.load();
      setScreenLoading(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubsacribe = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        navigation.navigate('ChatScreen');
      },
    );
    const unsubsawcribe = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        navigation.navigate('ChatScreen');
      },
    );
    const unsubsawwcribe = interstitial.addAdEventListener(
      AdEventType.CLICKED,
      () => {
        navigation.navigate('ChatScreen');
      },
    );
    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const onContinuePress = async () => {
    setScreenLoading(true);
    const adsEnabled = await fetchRemoteConfig();

    if (adsEnabled) {
      // Show ads
      try {
        interstitial.show();
      } catch (error) {
        console.log('Error', error);
        navigation.navigate('ChatScreen');
      }
    } else {
      // Don't show adsnavigation.navigate('ChatScreen');
      navigation.navigate('ChatScreen');
      // Alert.alert('NO ADS');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={IMAGES.AICHATBOT}
          resizeMode="contain"
          style={styles.headerImage}
        />
      </View>
      <View style={styles.headerSubtextContainer}>
        <Text style={styles.headerSubtext}>{LABELS.headerSubtext}</Text>
      </View>
      <View style={styles.mainScreenImageContainer}>
        <Image
          source={IMAGES.mainImage}
          resizeMode="contain"
          style={styles.mainScreenImageStyle}
        />
      </View>
      {screenLoading && (
        <View
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            bottom: '40%',
          }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}

      <CustomTextButton onPress={() => onContinuePress()} />

      <View style={styles.marginBottom}></View>
    </SafeAreaView>
  );
};
export default MainScreen;
