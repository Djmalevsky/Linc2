import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";

const Bullet = ({ icon, header, subHeader }) => {
  return (
    <>
      <View style={styles.bulletContainer}>
        <Icon name={icon} style={styles.icon} />
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <Text style={[styles.bodyRegular, styles.subheaderText]}>
        {subHeader}
      </Text>
    </>
  );
};

export default Bullet;
