import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

import MyButton from './MyButton';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

function BookItem({name, image, price, onPress, onPressDel}) {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.con}>
      <Image source={image ? {uri: image} : null} style={styles.image} />
      <View style={styles.detailsCon}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{price} $</Text>
        <View style={{flexDirection: 'row'}}>
          <MyButton title="Delete" onPress={onPressDel} />
          <MyButton title="Details" onPress={onPress} />
        </View>
      </View>
    </View>
  );
}
function useStyles(colors) {
  return StyleSheet.create({
    con: {
      backgroundColor: colors.cardColor,
      margin: 8,
      borderRadius: 8,
      height: phoneHeight * 0.43,
      width: phoneWidth * 0.44,
      overflow: 'hidden',
    },
    image: {
      height: phoneHeight * 0.3,
      width: '100%',
    },
    detailsCon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.textColor,
    },
  });
}
export default BookItem;
