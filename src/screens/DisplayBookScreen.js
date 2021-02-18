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

import MyButton from '../components/MyButton';
import MyInput from '../components/MyInput';

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
          <Text style={styles.decription}>
            {item.createdAt.substring(0, 10)}
          </Text>
        </View>
        <MyButton
          style={styles.button}
          title="Update"
          onPress={() => {
            setModalVisiable(true);
          }}
        />
      </View>

      <Modal visible={modalVisiable}>
        <View style={styles.updateCon}>
          <MyInput
            placeholder="Book Name"
            onChangeText={(text) => {
              setBookName(text);
            }}
            defaultValue={bookName}
          />

          <MyInput
            placeholder="Image URL"
            onChangeText={(text) => {
              setBookImage(text);
            }}
            defaultValue={bookImage}
          />
          <MyInput
            placeholder="Price"
            onChangeText={(text) => setBookPrice(text)}
            defaultValue={bookPrice}
          />
          <MyInput
            placeholder="bookDescription"
            onChangeText={(text) => setBookDescription(text)}
            defaultValue={bookDescription}
          />

          <MyButton
            style={styles.updateButton}
            title="Update"
            onPress={() => {
              Update(bookName, bookImage, bookDescription, bookPrice);
              setModalVisiable(false);
            }}
          />
          <MyButton
            style={styles.updateButton}
            title="Cancel"
            onPress={() => {
              setModalVisiable(false);
            }}
          />
        </View>
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
      fontSize: 17,
      margin: 15,
      fontFamily: 'Audiowide-Regular',
      marginTop: 20,
      color: colors.textColor,
    },
    decription: {
      fontSize: 15,
      margin: 5,
      color: colors.textColor,
    },
    button: {
      borderRadius: 5,
    },
    updateCon: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    updateButton: {
      alignSelf: 'center',
      borderRadius: 11,
      margin: 3,
    },
  });
}
export default DisplayBookScreen;
