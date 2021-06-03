import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import MainStack from './src/navigation/MainStack';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
