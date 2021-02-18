import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';

import axios from 'axios';
import {useTheme} from '@react-navigation/native';

const PhoneHeight = Dimensions.get('window').height;
const PhoneWidth = Dimensions.get('window').width;

function DisplayBookScreen({route}) {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const item = route.params;
  const id = item.id;

  const [bookName, setBookName] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookPrice, setBookPrice] = useState();
  const [bookDescription, setBookDescription] = useState('');
  const [modalVisiable, setModalVisiable] = useState(false);

  function Update(name, image, description, price) {
    axios
      .put(`https://602ba57eef26b40017f14804.mockapi.io/books/list/${id}`, {
        name: name,
        description: description,
        image: image,
        price: price,
      })
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <View style={styles.con}>
        <Text style={styles.mainTitle}>Book Details</Text>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={item.image ? {uri: item.image} : null}
          />
        </View>
        <View style={styles.detailsCon}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.decription}>{item.price} $</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Button
          title="Update"
          onPress={() => {
            setModalVisiable(true);
          }}
        />
      </View>

      <Modal visible={modalVisiable}>
        <TextInput
          placeholder="Update Name"
          onChangeText={(bookName) => {
            setBookName(bookName);
          }}
          defaultValue={bookName}
        />

        <TextInput
          placeholder="Image URL"
          onChangeText={(bookImage) => {
            setBookImage(bookImage);
          }}
          defaultValue={bookImage}
        />

        <TextInput
          placeholder="Price"
          onChangeText={(bookPrice) => setBookPrice(bookPrice)}
          defaultValue={bookPrice}
        />
        <TextInput
          placeholder="bookDescription"
          onChangeText={(bookDescription) =>
            setBookDescription(bookDescription)
          }
          defaultValue={bookDescription}
        />

        <Button
          title="Update"
          onPress={() => {
            Update(bookName, bookImage, bookDescription, bookPrice);
            setModalVisiable(false);
          }}
        />
      </Modal>
    </>
  );
}

function useStyles(colors) {
  return StyleSheet.create({
    con: {
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    imageCon: {
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      backgroundColor: 'black',
      height: PhoneHeight * 0.5,
      width: PhoneWidth * 0.8,
      marginTop: PhoneHeight * 0.05,
      overflow: 'hidden',
    },
    image: {
      height: PhoneHeight * 0.5,
      width: PhoneWidth * 0.8,
    },
    detailsCon: {
      backgroundColor: colors.cardColor,
      padding: 8,
      borderRadius: 9,
      margin: 9,
      width: PhoneWidth * 0.8,
    },
    mainTitle: {
      alignSelf: 'center',
      fontSize: 25,
      fontFamily: 'Audiowide-Regular',
      color: colors.textColor,
    },
    name: {
      fontSize: 20,
      margin: 15,
      fontFamily: 'Audiowide-Regular',
      marginTop: 20,
      color: colors.textColor,
    },
    decription: {
      fontSize: 20,
      margin: 15,
      textAlign: 'center',
      color: colors.textColor,
    },
  });
}
export default DisplayBookScreen;
