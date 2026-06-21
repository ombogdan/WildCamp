import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from 'screens/app-user/home';
import { navigationRef } from './root-navigator.config';

// import {AddPlaceScreen} from "../screens/add-place-screen";
// import {PlaceDetailsScreen} from "../screens/place-details-screen";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        {/*<Stack.Screen*/}
        {/*  name="AddPlace"*/}
        {/*  component={AddPlaceScreen}*/}
        {/*  options={{presentation: "modal"}}*/}
        {/*/>*/}
        {/*<Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
