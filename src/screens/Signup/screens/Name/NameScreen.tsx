import React, { useState, useEffect } from "react";
import StoreData from "../../../../localStorage/StoreData";
import { View, TextInput } from "react-native";
import GetData from "../../../../localStorage/GetData";
import { Screen } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";

const NameScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const regex = /^[a-z ,.'-]+$/i;

  useEffect(() => {
    (async () => {
      const storedName = await GetData("name");
      if (storedName) {
        setName(storedName);
        setValid(true);
      }
    })();
  }, []);

  // add more checks
  const onButtonPress = () => {
    navigation.navigate("Age");
  };

  const Content = () => {
    return (
      <View
        style={[
          styles.inputContainer,
          !valid && name.length > 0 ? styles.invalidInput : styles.validInput,
        ]}
      >
        <TextInput
          style={styles.text}
          value={name}
          onChangeText={(text) => {
            StoreData("name", text);
            setName(text);
            setValid(regex.test(text));
          }}
          autoCorrect={false}
          autoFocus
          autoCapitalize="none"
          maxLength={20}
        />
        {name.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setName("");
              setValid(false);
            }}
          >
            <Icon name="x" size={24} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Screen
      usingKeyboardIOS
      header="My name is"
      buttonTitle="Continue"
      callback={onButtonPress}
      isDisabled={!(valid && name.length >= 0)}
      Content={Content}
    />
  );
};

export default NameScreen;

/*
      <Text style={styles.subheader}>
        This is the name displayed on your profile
      </Text>
*/
