import * as React from "react";
import { View } from "react-native";
import styles from "../styles";
import { Button } from "react-native-elements";
import { colors } from "../../../../../../styles";
import { LinearGradient } from "expo-linear-gradient";
import stylesLocation from "../../../../../Signup/screens/Location/styles";

const onButtonPress = async () => {};
const ShareButtons = () => {
  return (
    <View style={styles.middle}>
      <View style={stylesLocation.bottom}>
        <Button
          onPress={onButtonPress}
          ViewComponent={LinearGradient}
          title="Linc Support"
          linearGradientProps={{
            colors: colors,
            start: { x: 1.5, y: 0.5 },
            end: { x: -1.5, y: 0.5 },
          }}
          buttonStyle={{
            paddingVertical: 10,
          }}
          containerStyle={{
            borderRadius: 30,
          }}
          titleStyle={stylesLocation.buttonTitle}
        />
      </View>
      <View style={stylesLocation.bottom}>
        <Button
          onPress={onButtonPress}
          ViewComponent={LinearGradient}
          title="Rate Linc"
          linearGradientProps={{
            colors: colors,
            start: { x: 1.5, y: 0.5 },
            end: { x: -1.5, y: 0.5 },
          }}
          buttonStyle={{
            paddingVertical: 10,
          }}
          containerStyle={{
            borderRadius: 30,
          }}
          titleStyle={stylesLocation.buttonTitle}
        />
      </View>
      <View style={stylesLocation.bottom}>
        <Button
          onPress={onButtonPress}
          ViewComponent={LinearGradient}
          title="Share Linc"
          linearGradientProps={{
            colors: colors,
            start: { x: 1.5, y: 0.5 },
            end: { x: -1.5, y: 0.5 },
          }}
          buttonStyle={{
            paddingVertical: 10,
          }}
          containerStyle={{
            borderRadius: 30,
          }}
          titleStyle={stylesLocation.buttonTitle}
        />
      </View>
    </View>
  );
};

export default ShareButtons;
