import React from "react";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import { UI_GRAY_20 } from "../../colors";
import styles from "./styles";

const stackOptions = () => {
  return {
    title: "",
    headerTransparent: true,
    headerBackTitleVisible: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerBackImage: () => {
      return <Icon name="arrow-left" color={UI_GRAY_20} style={styles.icon} />;
    },
  };
};

export default stackOptions;
