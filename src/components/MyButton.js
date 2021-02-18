import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

function MyButton({title, onPress, style}) {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.con, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function useStyles(colors) {
  return StyleSheet.create({
    con: {
      backgroundColor: colors.buttonColor,
      height: 30,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.textColor,
    },
  });
}
export default MyButton;
