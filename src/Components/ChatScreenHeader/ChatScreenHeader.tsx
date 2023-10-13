import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import {LABELS} from '../../Assets/Labels';
import styles from './styles';

type ChatScreenHeaderPropTypes = {
  onMenuPress: any;
  onMutePress: any;
  onSettingsPress: any;
  isPremium: boolean;
};

const ChatScreenHeader = ({
  onMenuPress,
  onMutePress,
  onSettingsPress,
  isPremium,
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
      {isPremium && (
        <Pressable
          style={{
            padding: 10,
            borderRadius: 20,
            backgroundColor: 'gold',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onMutePress}>
          <Text style={{color: '#7836ff', fontWeight: 'bold'}}>GO PREMIUM</Text>
        </Pressable>
      )}
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
