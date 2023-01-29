import React from 'react';
import {enableScreens} from 'react-native-screens';
import {StackScreenProps} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import ResultScreen from '../screens/ResultScreen';
import CameraScreen from '../screens/CameraScreen';

export type MainStackParams = {
  Camera: undefined;
  Gallery: undefined;
  Save: undefined;
};

export type StackScreens = keyof MainStackParams;
export type MainStackScreenProps<T extends StackScreens> = StackScreenProps<
  MainStackParams,
  T
>;

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator<MainStackParams>();

const MainStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="CameraScreen" component={CameraScreen} />
    <Screen name="ResultScreen" component={ResultScreen} />
  </Navigator>
);

export default MainStack;
