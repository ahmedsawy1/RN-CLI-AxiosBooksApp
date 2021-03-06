import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Alert, Modal, Text, Switch, Button} from 'react-native';

import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';
import {useTheme} from '@react-navigation/native';

import BookItem from '../components/BookItem';
import MyButton from '../components/MyButton';
import MyInput from '../components/MyInput';
import baseURL from '../server/baseURL';
import {useSelector, useDispatch} from 'react-redux';
import {addBook, getBooks} from '../redux/booksActions';

function MainScreen({navigation}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);

  const [dark, setdark] = useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [bookName, setBookName] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookPrice, setBookPrice] = useState();
  const [bookDescription, setBookDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  function addNewBook(name, description, price, image) {
    if (name.length < 5) {
      setErrorMessage('Enter A name');
    } else if (image.length < 5) {
      setErrorMessage('Enter A Image');
    } else if (price.length === 0) {
      setErrorMessage('Enter A Price');
    } else if (description.length < 5) {
      setErrorMessage('Enter A Description');
    } else {
      dispatch(addBook(bookName, bookDescription, bookPrice, bookImage));
      setVisible(false);
      dispatch(getBooks());
    }
  }

  function Delete(_id) {
    axios
      .delete(`${baseURL}books/${_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <View style={styles.con}>
        <View>
          <FlatList
            style={{marginBottom: 67}}
            initialNumToRender={2}
            numColumns={2}
            onRefresh={() => Get()}
            refreshing={loading}
            data={data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({item}) => (
              <BookItem
                name={item.name}
                // description={item.description}
                image={item.image}
                price={item.price}
                onPressDel={() =>
                  Alert.alert(
                    'Delete',
                    'Do you want to delete that book for ever ?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          Delete(item._id);
                          Get();
                        },
                      },
                    ],
                    {cancelable: false},
                  )
                }
                onPress={() => navigation.navigate('DisplayBookScreen', item)}
              />
            )}
          />
        </View>
        <View style={styles.buttonCon}>
          <MyButton
            style={styles.button}
            title="ADD"
            onPress={() => setVisible(true)}
          />
          <MyButton
            style={styles.button}
            title="Settings"
            onPress={() => setSettingsVisible(true)}
          />
        </View>
      </View>
      <Modal visible={visible}>
        <View style={styles.addScreen}>
          <MyInput
            placeholder="Book Name"
            onChangeText={(text) => {
              setBookName(text);
              setErrorMessage('');
            }}
            value={bookName}
          />

          <MyInput
            placeholder="Book Image URL"
            onChangeText={(text) => {
              setBookImage(text);
              setErrorMessage('');
            }}
            value={bookImage}
          />

          <MyInput
            placeholder="Book Price"
            onChangeText={(text) => {
              setBookPrice(text);
              setErrorMessage('');
            }}
            value={bookPrice}
            keyboardType="numeric"
          />

          <MyInput
            placeholder="Book Description"
            onChangeText={(text) => {
              setBookDescription(text);
            }}
            value={bookDescription}
          />
          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <MyButton
            style={styles.modalButtons}
            title="Add Book"
            onPress={() => {
              addNewBook(bookName, bookDescription, bookPrice, bookImage);
            }}
          />
          <MyButton
            style={styles.modalButtons}
            title="Cancel"
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </Modal>

      <Modal visible={settingsVisible}>
        <View style={styles.modalSettings}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch
              value={dark}
              onValueChange={(val) => {
                setdark(val);

                EventRegister.emit('ChangeTheme', val);
              }}
            />
          </View>
          <Text style={styles.text} onPress={() => setSettingsVisible(false)}>
            Close
          </Text>
        </View>
      </Modal>
    </>
  );
}

function useStyles(colors) {
  return StyleSheet.create({
    con: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: 47,
      width: '45%',
      borderRadius: 10,
    },
    buttonCon: {
      width: '100%',
      flexDirection: 'row',
      height: 67,
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-around',
      backgroundColor: colors.cardColor,
      alignItems: 'center',
    },
    modalSettings: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    text: {
      color: colors.textColor,
      margin: 10,
      fontSize: 19,
    },
    addScreen: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    modalButtons: {
      alignSelf: 'center',
      borderRadius: 11,
      margin: 3,
    },
    errorMessage: {
      color: 'red',
      alignSelf: 'center',
    },
  });
}
export default MainScreen;
