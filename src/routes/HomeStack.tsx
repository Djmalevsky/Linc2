import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { stackOptions, HomeTabs } from "./index";
import { SettingsScreen, ChatRoom } from "../screens";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTabs" screenOptions={stackOptions}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default HomeStack;
