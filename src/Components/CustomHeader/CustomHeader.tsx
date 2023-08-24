import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {IMAGES} from '../../Assets/Images';
import styles from './styles';

type CustomHeaderProp = {
  title: string;
  onPress: any;
};

const CustomHeader = ({title, onPress}: CustomHeaderProp) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={onPress} style={styles.backButtonStyle}>
        <Image source={IMAGES.backButton} resizeMode="center" />
      </Pressable>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTextStyle}>{title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
