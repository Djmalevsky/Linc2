import React from "react";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Entypo";
import {
  GradientButton,
  Header,
  Container,
  ContentContainer,
} from "../../components";
import useStatusBar from "../../../../hooks/useStatusBar";

const LocationScreen = ({ navigation }) => {
  useStatusBar("dark-content");

  const onButtonPress = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Permission to access location was denied, enable in settings to continue."
      );
      navigation.navigate("LocDenied");
      return;
    }
    navigation.navigate("Agreement");
  };

  return (
    <Container usingKeyboardIOS={false}>
      <Header header="Location" alt={false} />
      <ContentContainer>
        <Icon name="location" size={150} />
      </ContentContainer>
      <GradientButton
        callback={onButtonPress}
        isDisabled={false}
        buttonTitle="Allow"
      />
    </Container>
  );
};

export default LocationScreen;
