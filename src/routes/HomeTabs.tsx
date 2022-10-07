import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { SearchScreen, MessageScreen, ProfileScreen } from "../screens";
import EStyleSheet from "react-native-extended-stylesheet";
import { TURQUOISE, UI_GRAY_40 } from "../colors";

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  const { bottom } = useSafeAreaInsets();

  const styles = EStyleSheet.create({
    bottomSpacer: {
      height: bottom,
      backgroundColor: "$white",
    },
    card: () => EStyleSheet.value("$card"),
  });

  return (
    <>
      <Tab.Navigator
        initialRouteName="Search"
        tabBarPosition="bottom"
        tabBarOptions={{
          renderIndicator: () => {},
          showIcon: true,
          showLabel: false,
          activeTintColor: TURQUOISE,
          inactiveTintColor: UI_GRAY_40,
        }}
        style={styles.card}
      >
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="message-circle" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
      {useSafeAreaInsets().bottom > 0 && <View style={styles.bottomSpacer} />}
    </>
  );
};

export default HomeTabs;
