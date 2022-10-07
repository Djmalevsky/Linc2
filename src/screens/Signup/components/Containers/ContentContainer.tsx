import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  contentContainer: {
    marginTop: "55 * $height",
    flex: 1,
  },
});

const ContentContainer = ({ children }) => {
  return <View style={styles.contentContainer}>{children}</View>;
};

export default ContentContainer;
