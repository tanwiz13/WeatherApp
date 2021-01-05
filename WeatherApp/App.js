import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Provider, observer, inject } from 'mobx-react';
import GlobalStore from './src/stores/GlobalStore';
import Tables from './src/screens/Tables';
import Songs from './src/screens/Songs';
import Splash from './src/screens/Splash';
import ErrorScreen from './src/screens/ErrorScreen';
import SongDetail from './src/screens/SongDetail';

const Stack = createStackNavigator();
const store = new GlobalStore();
const App = (observer(() => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Songs" component={Songs} />
          <Stack.Screen name="SongDetail" component={SongDetail} />
          <Stack.Screen name="Tables" component={Tables} />
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}));
export default App;
