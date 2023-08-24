import React from 'react';
import {
  View,
  Text,
  Share,
  SafeAreaView,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import RadialGradient from 'react-native-radial-gradient';
import {CustomHeader} from '../../Components/CustomHeader';
import {CallToAction} from '../../Components/CallToAction';
import styles from './styles';

// 6462707878
const GOOGLE_PACKAGE_NAME = 'com.aichatbot';
const IOS_APP_ID = `6462707878`;
const androidAppUrl = `https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`;
const iosAppUrl = `https://apps.apple.com/app/id${IOS_APP_ID}`;

type SettingsScreenPropTypes = {
  navigation: any;
};
const SettingsScreen = ({navigation}: SettingsScreenPropTypes) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
        Alert.alert('Please check for Google Play Store'),
      );
    } else {
      console.log('IOS ');

      // Linking.openURL(
      //   `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      // ).catch(err => Alert.alert('Please check for the App Store'));
    }
  };

  const onShare = async () => {
    try {
      let message = `Check out this amazing app! ${
        Platform.OS === 'ios' ? iosAppUrl : androidAppUrl
      }`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        // Sharing completed
        if (result.activityType) {
          console.log('Shared with', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // Sharing dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const onPrivacyPolicy = async () => {
    await Linking.openURL(
      'https://ginnieworks.blogspot.com/p/privacy-policy.html',
    );
  };
  const onMoreApps = async () => {
    await Linking.openURL(
      'https://play.google.com/store/search?q=pub:GinnieWorks&c=apps',
    );
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
      <View style={{paddingTop: 20}}></View>
      <CustomHeader onPress={() => onBackPress()} title={'Settings'} />
      <View style={styles.optionsContainer}>
        <CallToAction
          onPress={() => onShare()}
          icon={IMAGES.shareApp}
          title={'Share App'}
        />
        <CallToAction
          onPress={() => openStore()}
          icon={IMAGES.rateApp}
          title={'Rate us'}
        />
        {Platform.OS === 'android' ? (
          <CallToAction
            onPress={() => onMoreApps()}
            icon={IMAGES.moreApps}
            title={'More App'}
          />
        ) : null}
        <CallToAction
          onPress={() => onPrivacyPolicy()}
          icon={IMAGES.privacyPolicy}
          title={'Privacy Policy'}
        />
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
