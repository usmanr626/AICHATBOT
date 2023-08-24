import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import styles from './styles';

type CallToActionProps = {
  icon: any;
  title: string;
  onPress: any;
};
const CallToAction = ({icon, title, onPress}: CallToActionProps) => {
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <View>
        <Image source={icon} resizeMode="contain" style={styles.iconStyle} />
      </View>
      <View style={styles.textContainerStyle}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};
export default CallToAction;
