import React from "react";
import { SafeAreaView } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  content: {
    marginHorizontal: "22rem",
  },
});

const ContentContainer = ({ children }) => {
  return <SafeAreaView style={styles.content}>{children}</SafeAreaView>;
};

export default ContentContainer;
