import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import {LABELS} from '../../Assets/Labels';
import {CustomTextButton} from '../../Components/CustomTextButton';
import styles from './styles';

import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

import remoteConfig from '@react-native-firebase/remote-config';

// const adUnitId = TestIds.INTERSTITIAL;

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
  ? `ca-app-pub-4161728863134324/2377302896`
  : 'ca-app-pub-4161728863134324/3758972213';

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

type MainScreenPropTypes = {
  navigation: any;
};
const MainScreen = ({navigation}: MainScreenPropTypes) => {
  const isFocused = useIsFocused();

  const [loaded, setLoaded] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [adsEnabledIos, setAdsEnabledIos] = useState(true);
  const [adsEnabledAndroid, setAdsEnabledAndroid] = useState(true);
  const [reloadAd, setReloadAd] = useState(false);

  // remoteConfig().setDefaults({
  //   ads_enabled_ios: false, // Default value for ads on iOS
  //   ads_enabled: false, // Default value for ads on Android
  // });

  // const fetchRemoteConfig = async () => {};

  useEffect(() => {
    console.log('loading Ad');

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

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // Use a separate useEffect for reloading the ad based on reloadAd state change
  useEffect(() => {
    if (reloadAd) {
      console.log('Reloading Ad');

      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          console.log('INTERSTITIAL AD LOADED');

          setLoaded(true);
        },
      );

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return unsubscribe;
    }
  }, [reloadAd]);

  useEffect(() => {
    const fetchRemote = async () => {
      try {
        console.log(
          'FETCHING REMOTE CONFIG',
          await remoteConfig().fetchAndActivate(),
        );

        await remoteConfig().fetchAndActivate(); // Fetch and activate the config
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: 500,
          // Other Remote Config settings
        });

        if (Platform.OS === 'android') {
          const adsEnabled = remoteConfig().getValue('ads_enabled').asBoolean();
          setAdsEnabledAndroid(adsEnabled);
          // console.log('ADS ENABLED ANDROID123', adsEnabled);
        } else if (Platform.OS === 'ios') {
          const adsEnabled = remoteConfig()
            .getValue('ads_enabled_ios')
            .asBoolean();
          setAdsEnabledIos(adsEnabled);
          console.log('ADS ENABLED IOS', adsEnabled);
        } else {
          // Handle other platforms if needed
          setAdsEnabledIos(false);
          setAdsEnabledAndroid(false);
        }
      } catch (error) {
        // console.error('Error fetching remote config:', error);
        setAdsEnabledIos(false);
        setAdsEnabledAndroid(false);
      }
    };

    fetchRemote();
  }, []);

  useEffect(() => {
    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('AD SEEN');
      interstitial.load();
      setReloadAd(true);
      setScreenLoading(false);
      navigation.navigate('ChatScreen');
    });
    interstitial.addAdEventListener(AdEventType.OPENED, () => {
      console.log('AD SEEN');
      interstitial.load();
      setReloadAd(true);
      setScreenLoading(false);
      navigation.navigate('ChatScreen');
    });
    interstitial.addAdEventListener(AdEventType.CLICKED, () => {
      console.log('AD SEEN');
      interstitial.load();
      setReloadAd(true);
      setScreenLoading(false);
      navigation.navigate('ChatScreen');
    });
    interstitial.addAdEventListener(AdEventType.ERROR, () => {
      console.log('AD SEEN');
      interstitial.load();
      setReloadAd(true);
      setScreenLoading(false);
      navigation.navigate('ChatScreen');
    });

    // Start loading the interstitial straight away
  }, []);

  const onContinuePress = async () => {
    setReloadAd(false);
    setScreenLoading(true);

    if (Platform.OS === 'ios' && adsEnabledIos) {
      // Show ads only on iOS with adsEnablediOS true

      setTimeout(() => {
        interstitial.show();
      }, 3000);
      // setScreenLoading(false);
    } else if (Platform.OS === 'android' && adsEnabledAndroid) {
      // Show ads only on Android with adsEnabledAndroid true

      setTimeout(() => {
        interstitial.show();
      }, 3000);
      // setScreenLoading(false);
    } else {
      // interstitial.show();
      // Don't show ads or show on Android
      // setScreenLoading(false);
      setTimeout(() => {
        navigation.navigate('ChatScreen');
      }, 3000);
    }
  };
  // const onContinuePress = async () => {
  //   setScreenLoading(true);
  //   // const {adsEnabled, adsEnablediOS} = await fetchRemoteConfig();
  //   console.log('REMOTE CONFIG ios continie', adsEnabledIos);
  //   console.log('REMOTE CONFIG android continue', adsEnabledAndroid);

  //   // return;

  //   if (Platform.OS === 'ios' && adsEnabledIos) {
  //     // Show ads only on iOS with adsEnablediOS true
  //     try {
  //       interstitial.show();
  //     } catch (error) {
  //       console.log('Error', error);
  //       navigation.navigate('ChatScreen');
  //     }
  //   } else if (Platform.OS === 'android' && adsEnabledAndroid) {
  //     // Show ads only on Android with adsEnabledAndroid true
  //     try {
  //       interstitial.show();
  //     } catch (error) {
  //       console.log('Error', error);
  //       navigation.navigate('ChatScreen');
  //     }
  //   } else {
  //     // Don't show ads or show on Android
  //     navigation.navigate('ChatScreen');
  //   }
  // };

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
