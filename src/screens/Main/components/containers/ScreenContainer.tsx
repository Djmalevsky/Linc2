import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import useStatusBar from "../../../../hooks/useStatusBar";

const styles = EStyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "$uiWhite",
  },
});

const Container = ({ children }) => {
  useStatusBar("dark-content");

  return <View style={styles.background}>{children}</View>;
};

export default Container;
