import React from "react";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import {
  GREEN_GRADIENT,
  INACTIVE_BTN_GRADIENT,
  START_POS,
  END_POS,
} from "../../../../colors";
import { View } from "react-native";

const GradientButton = ({ callback, isDisabled, buttonTitle }) => {
  return (
    <View style={[styles.container, styles.buttonShadow]}>
      <Button
        //raised
        ViewComponent={LinearGradient}
        disabled={isDisabled}
        onPress={callback}
        title={buttonTitle}
        linearGradientProps={{
          start: START_POS,
          end: END_POS,
          colors: isDisabled ? INACTIVE_BTN_GRADIENT : GREEN_GRADIENT,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={[styles.buttonTitle, styles.activeTitle]}
        disabledTitleStyle={[styles.buttonTitle, styles.inactiveTitle]}
      />
    </View>
  );
};

export default GradientButton;
