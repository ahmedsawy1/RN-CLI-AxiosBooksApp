import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Modal,
  Text,
  Switch,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';
import {useTheme} from '@react-navigation/native';

import BookItem from '../components/BookItem';
import MyButton from '../components/MyButton';
import MyInput from '../components/MyInput';

function MainScreen({navigation}) {
  const [dark, setdark] = useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [data, setData] = useState([]);
  const [bookName, setBookName] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    axios
      .get('https://602ba57eef26b40017f14804.mockapi.io/books/list')
      .then(async function (response) {
        setLoading(true);
        setData(response.data);
        setLoading(false);
      })

      .catch((err) => console.error(err));
  }

  function Post(name, image, description, price) {
    if (name.length < 5) {
      setErrorMessage('Enter A name');
    } else if (image.length < 5) {
      setErrorMessage('Enter A Image');
    } else if (price.length < 5) {
      setErrorMessage('Enter A Price');
    } else if (description.length < 5) {
      setErrorMessage('Enter A Description');
    } else {
      axios
        .post('https://602ba57eef26b40017f14804.mockapi.io/books/list', {
          name: name,
          description: description,
          image: image,
          price: price,
        })

        .catch((err) => console.error(err))
        .finally(() => setVisible(false));
    }
  }

  function Delete(id) {
    axios
      .delete(`https://602ba57eef26b40017f14804.mockapi.io/books/list/${id}`)
      .then((response) => {})
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <BookItem
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                createdAt={item.createdAt}
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
                          Delete(item.id);
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
            }}
            value={bookImage}
          />

          <MyInput
            placeholder="Book Price"
            onChangeText={(text) => {
              setBookPrice(text);
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
              Post(bookName, bookImage, bookDescription, bookPrice);
              // setVisible(false);
              Get();
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
