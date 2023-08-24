import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import {LABELS} from '../../Assets/Labels';

type CustomTextButtonTypes = {
  onPress: any;
};

const CustomTextButton = ({onPress}: CustomTextButtonTypes) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonMainContainer}>
      <Text style={styles.buttonText}>{LABELS.continue}</Text>
    </Pressable>
  );
};
export default CustomTextButton;
