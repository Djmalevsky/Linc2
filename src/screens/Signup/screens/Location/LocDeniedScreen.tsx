import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const LocDeniedScreen = () => {
  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Text>Location Denied Screen</Text>
    </View>
  );
};

export default LocDeniedScreen;
