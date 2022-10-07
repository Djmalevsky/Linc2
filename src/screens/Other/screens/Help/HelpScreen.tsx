import React from "react";
import { Text, View } from "react-native";
import useStatusBar from "../../../../hooks/useStatusBar";

const HelpScreen = ({ navigation }) => {
  useStatusBar("dark-content");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Help screen goes here</Text>
    </View>
  );
};

export default HelpScreen;
