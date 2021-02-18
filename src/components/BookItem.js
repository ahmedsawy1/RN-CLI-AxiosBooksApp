import React from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MyButton from './MyButton';

import {useTheme} from '@react-navigation/native';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

function BookItem({name, image, price, createdAt, onPress, onPressDel}) {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.con}>
      <Image source={image ? {uri: image} : null} style={styles.image} />
      <View style={styles.detailsCon}>
        <Text style={{color: colors.textColor}}>{name}</Text>
        <Text style={{color: colors.textColor}}>{price} $</Text>
        <Text style={{color: colors.textColor}}>
          {createdAt.substring(0, 9)}
        </Text>
        {/* <Text>Time:{createdAt.substring(11, 16)}</Text> */}
        <View style={{flexDirection: 'row'}}>
          {/* <Button color="blue" title="Delete" onPress={onPressDelete} /> */}
          {/* <Button color="blue" title="show" onPress={onPressDelete} /> */}
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
  });
}
export default BookItem;
