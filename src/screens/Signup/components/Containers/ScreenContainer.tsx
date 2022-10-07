import React from "react";
import { Platform, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import useStatusBar from "../../../../hooks/useStatusBar";
import KeyboardSpacer from "react-native-keyboard-spacer";

const styles = EStyleSheet.create({
  background: {
    backgroundColor: "$uiWhite",
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: "49rem",
  },
});

const Container = ({ children, usingKeyboardIOS }) => {
  useStatusBar("dark-content");

  return (
    <View style={styles.background}>
      <View style={styles.container}>{children}</View>
      {Platform.OS === "ios" && usingKeyboardIOS && <KeyboardSpacer />}
    </View>
  );
};

export default Container;
