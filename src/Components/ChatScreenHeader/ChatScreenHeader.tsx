import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import {LABELS} from '../../Assets/Labels';
import styles from './styles';

type ChatScreenHeaderPropTypes = {
  onMenuPress: any;
  onMutePress: any;
  onSettingsPress: any;
};

const ChatScreenHeader = ({
  onMenuPress,
  onMutePress,
  onSettingsPress,
}: ChatScreenHeaderPropTypes) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={onMenuPress}>
        <Image
          source={IMAGES.menuButton}
          resizeMode="contain"
          style={styles.menuButtonImageStyle}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{LABELS.AiChatbot}</Text>
      </View>
      <Pressable onPress={onMutePress}>
        {/* <Image
          source={IMAGES.muteButton}
          resizeMode="center"
          style={styles.muteButtonImageStyle}
        /> */}
      </Pressable>
      <Pressable onPress={onSettingsPress}>
        <Image
          source={IMAGES.settingsButton}
          resizeMode="contain"
          style={styles.settingsButtonImageStyle}
        />
      </Pressable>
    </View>
  );
};
export default ChatScreenHeader;
