import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  Container,
  GradientButton,
  Header,
  ContentContainer,
} from "../../components";
import styles from "./styles";
import { binaryGenders, schoolYears } from "./data";
import { StoreData } from "../../../../localStorage";

const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState(-1);
  const [schoolYear, setSchoolYear] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const onButtonPress = async () => {
    await StoreData("gender", gender.toString());
    await StoreData("schoolYear", schoolYear.toString());
    navigation.navigate("Passion");
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Container usingKeyboardIOS={false}>
        <Header header="I am a" alt={false} />
        <ContentContainer>
          {schoolYears.map((val) => {
            const isSelected = schoolYear === val.key;
            return (
              <TouchableOpacity
                key={val.key}
                style={styles.radioContainer}
                onPress={() => setSchoolYear(val.key)}
              >
                <View
                  style={[
                    styles.radio,
                    isSelected ? styles.activeRadio : styles.inactiveRadio,
                  ]}
                >
                  {isSelected && <View style={styles.radioFill} />}
                </View>
                <Text style={[styles.radioText, styles.inactiveText]}>
                  {val.text}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={styles.divider} />
          {binaryGenders.map((val) => {
            const isSelected = gender === val.key;
            return (
              <TouchableOpacity
                key={val.key}
                onPress={() => setGender(val.key)}
                style={[
                  styles.button,
                  isSelected ? styles.activeButton : styles.inactiveButton,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isSelected ? styles.activeText : styles.inactiveText,
                  ]}
                >
                  {val.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[
              styles.button,
              styles.inactiveButton,
              { flexDirection: "row" },
            ]}
            onPress={toggleModal}
          >
            <Text style={[styles.buttonText, styles.inactiveText]}>Other</Text>
            <Icon name="chevron-right" style={[styles.icon]} />
          </TouchableOpacity>
        </ContentContainer>
        <GradientButton
          callback={onButtonPress}
          isDisabled={gender === -1 || schoolYear === -1}
          buttonTitle="Continue"
        />
      </Container>
    </>
  );
};

export default GenderScreen;

/*
<ModalContainer modalVisible={modalVisible} toggleModal={toggleModal}>
        <Text>Testicle</Text>
      </ModalContainer>
*/
