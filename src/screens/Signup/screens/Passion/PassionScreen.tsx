import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import passionsArray from "./data/passions";
import {
  Container,
  ContentContainer,
  GradientButton,
  Header,
} from "../../components";
import useStatusBar from "../../../../hooks/useStatusBar";
import LinearGradient from "expo-linear-gradient";
import { StoreData } from "../../../../localStorage";

const PassionScreen = ({ navigation }) => {
  useStatusBar("dark-content");
  const [selectedPassions, setSelectedPassions] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const changeSelection = (key: number) => {
    const indexOf = selectedPassions.indexOf(key);

    if (indexOf === -1) {
      const newPassions = [...selectedPassions, key];
      setSelectedPassions(newPassions);
    } else {
      let newPassions = selectedPassions;
      newPassions.splice(indexOf, 1);
      setSelectedPassions(newPassions);
    }
    setUpdateState(!updateState);
  };

  const onButtonPress = async () => {
    await StoreData("passions", JSON.stringify(selectedPassions));
    navigation.navigate("Photo");
  };

  return (
    <Container usingKeyboardIOS={false}>
      <Header header="Passion Selection" />
      <ContentContainer>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {passionsArray.map((item, index) => {
            const isSelected = selectedPassions.includes(index);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => changeSelection(index)}
                style={[
                  styles.passionButton,
                  isSelected ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <Text
                  style={[
                    styles.passionText,
                    isSelected ? styles.activeText : styles.inactiveText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ContentContainer>
      <GradientButton
        callback={onButtonPress}
        isDisabled={false}
        buttonTitle="Continue"
      />
    </Container>
  );
};

export default PassionScreen;

/*
      <LinearGradient
        // scrollview Linear Gradient
        colors={["white", "transparent", "transparent", "white"]}
        locations={[0.13, 0.16, 0.84, 0.87]}
        style={styles.fadeout}
      />
      */
