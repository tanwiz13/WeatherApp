import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Splash from './src/screens/Splash';
import { Provider, observer, inject } from 'mobx-react';
import GlobalStore from './src/stores/GlobalStore';
import ErrorScreen from './src/screens/ErrorScreen';

const Stack = createStackNavigator();
const store = new GlobalStore();
const App = (observer(() => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}));
export default App;
