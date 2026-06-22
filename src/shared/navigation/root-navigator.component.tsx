import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from 'screens/app-user/home';
import { AddCampingPlaceScreen } from 'screens/app-user/add-camping-place';
import { navigationRef } from './root-navigator.config';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddCampingPace"
          component={AddCampingPlaceScreen}
          options={{presentation: "modal"}}
        />
        {/* <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
