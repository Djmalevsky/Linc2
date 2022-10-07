import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    height: "151 * $height",
    //alignItems: "center",
    justifyContent: "flex-end",
  },
  header: () => EStyleSheet.value("$h1"),
  headerAlt: () => EStyleSheet.value("$h1_alt"),
});

const Header = ({ header, alt = false }) => {
  return (
    <View style={styles.container}>
      <Text style={alt ? styles.headerAlt : styles.header}>{header}</Text>
    </View>
  );
};

export default Header;
