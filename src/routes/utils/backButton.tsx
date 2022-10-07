import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { cancelSignup } from "./functions";
import styles from "./styles";

const backButton = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          "Cancel signup",
          "Are you sure you want to back out now? All your data will be deleted.",
          [
            {
              text: "Delete",
              onPress: () => cancelSignup(navigation),
              style: "destructive",
            },
            {
              text: "Cancel",
              style: "default",
            },
          ]
        )
      }
    >
      <Icon name="x" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default backButton;
