import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BaseScreen from './src/Screens/Base';
import TopScreen from './src/Screens/Top';

export type StackType = {
  BaseScreen: undefined;
  TopScreen: {
    number: number;
  };
};

const Stack = createSharedElementStackNavigator<StackType>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={BaseScreen} name="BaseScreen" />
        <Stack.Screen
          component={TopScreen}
          name="TopScreen"
          options={{
            presentation: 'modal',
            cardOverlayEnabled: true,
            gestureEnabled: false,
            cardShadowEnabled: true,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
          sharedElements={route => {
            const {number} = route.params;
            return [`item.${number}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
