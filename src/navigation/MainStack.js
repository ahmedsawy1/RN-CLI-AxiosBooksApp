import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import DisplayBookScreen from '../screens/DisplayBookScreen';
import {EventRegister} from 'react-native-event-listeners';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: 'gray',
    backgroundColor: 'black',
    textColor: 'aqua',
    cardColor: '#1B1E7D',
    buttonColor: 'gray',
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: 'gray',
    backgroundColor: 'white',
    textColor: 'black',
    cardColor: 'dodgerblue',
    buttonColor: 'blue',
  },
};

const Stack = createStackNavigator();

function MainStack() {
  useEffect(() => {
    let listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setIsDark(data);
    });
    return () => {
      false;
    };
  }, []);

  const [isDark, setIsDark] = useState(false);

  const Theme = isDark ? customDarkTheme : customDefaultTheme;

  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="DisplayBookScreen" component={DisplayBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
