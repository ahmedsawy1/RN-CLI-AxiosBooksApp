import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

function MyInput({placeholder, defaultValue, ...props}) {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.con}>
      <TextInput
        placeholderTextColor={colors.textColor}
        {...props}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={styles.inputText}
      />
    </View>
  );
}

function useStyles(colors) {
  return StyleSheet.create({
    con: {
      borderRadius: 9,
      width: '90%',
      margin: 8,
      borderWidth: 1,
      borderColor: colors.buttonColor,
    },
    inputText: {
      color: colors.textColor,
    },
  });
}
export default MyInput;
