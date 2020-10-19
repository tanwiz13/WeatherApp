import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import { Provider, observer } from 'mobx-react';
import { observable } from 'mobx';
import stores from './src/stores/Stores';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider {...stores}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
// export default App;
export default (observer(App));
