import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { stackOptions, backButton } from "./index";
import {
  PhoneScreen,
  GenderScreen,
  LocationScreen,
  LocDeniedScreen,
  NameScreen,
  AgreementScreen,
  AgeScreen,
  PassionScreen,
  PhotoScreen,
  LoginScreen,
  HelpScreen,
  CodeInputScreen,
} from "../screens";

const Stack = createStackNavigator();

const SignupStack = () => {
  return (
    <Stack.Navigator
      // CHANGE INITIAL SCREEN HERE
      initialRouteName="Login"
      screenOptions={stackOptions}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="CodeInput" component={CodeInputScreen} />
      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={({ navigation }) => ({
          headerLeft: () => backButton(navigation),
          gestureEnabled: false,
        })}
      />
      <Stack.Screen name="Age" component={AgeScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Passion" component={PassionScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="LocDenied" component={LocDeniedScreen} />
      <Stack.Screen
        name="Agreement"
        component={AgreementScreen}
        options={({ navigation }) => ({
          headerLeft: () => backButton(navigation),
          gestureEnabled: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default SignupStack;
