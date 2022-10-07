import React, { useState, useRef, useContext } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebase, firebaseConfig } from "../../../../config/firebaseConfig";
//import PhoneInput from "react-native-phone-number-input";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import {
  GradientButton,
  Header,
  Container,
  ContentContainer,
} from "../../components";
import countries from "./data/countries";
import { Modalize } from "react-native-modalize";
import filter from "lodash.filter";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { Context } from "../../../../context/authContext";

const PhoneScreen = ({ navigation }) => {
  const { saveRecaptchaVerifier } = useContext(Context);
  const recaptchaVerifier = useRef(null);
  const modalRef = useRef<Modalize>(null);
  const [verifyError, setVerifyError] = useState("");

  //const phoneInput = useRef(null);
  const [ext, setExt] = useState("1");
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);
  const [data, setData] = useState(countries);

  const onContinuePress = async () => {
    try {
      const phoneNum = parsePhoneNumberWithError("+" + ext + value).format(
        "E.164"
      );
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      setVerifyError(undefined);
      //setVerificationId("");
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNum,
        recaptchaVerifier.current
      );
      saveRecaptchaVerifier(recaptchaVerifier);
      navigation.navigate("CodeInput", {
        verificationId,
        phoneNum,
        phoneProvider,
      });
    } catch (e) {
      setVerifyError(e);
      //console.log(e);
    }
  };

  const searchBar = () => {
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <TextInput
          autoFocus
          onChangeText={(text) => {
            setData(
              filter(countries, function (o: { name: string }) {
                return o.name.toLowerCase().includes(text.toLowerCase());
              })
            );
          }}
        />
      </View>
    );
  };

  return (
    <>
      <Container usingKeyboardIOS>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          // currently crashes android
          // attemptInvisibleVerification={true}
        />
        <Header header="My number is" />
        <ContentContainer>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                setData(countries);
                modalRef.current?.open();
              }}
            >
              <Text style={styles.text}>+{ext}</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.inputContainer,
                {
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 15,
                },
              ]}
            >
              <TextInput
                style={[styles.text, { flex: 1 }]}
                value={value}
                onChangeText={(text) => {
                  setValue(text);
                  try {
                    const isValid = parsePhoneNumberWithError(
                      "+" + ext + text
                    ).isPossible();
                    if (isValid !== valid) {
                      setValid(isValid);
                    }
                  } catch {}
                }}
                autoCorrect={false}
                autoFocus
                autoCapitalize="none"
                maxLength={13}
                keyboardType="number-pad"
              />
              {value.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setValue("");
                    setValid(false);
                  }}
                >
                  <Icon name="x" size={24} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ContentContainer>
        <GradientButton
          callback={onContinuePress}
          isDisabled={!valid}
          buttonTitle="Continue"
        />
      </Container>
      <Modalize
        ref={modalRef}
        HeaderComponent={searchBar}
        flatListProps={{
          data: data,
          renderItem: ({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setExt(item.ext);
                modalRef.current?.close();
              }}
              // style divider here
              style={[
                index < countries.length - 1 && { borderBottomWidth: 1 },
                { padding: 30 },
              ]}
            >
              <Text>
                {item.name} (+{item.ext})
              </Text>
            </TouchableOpacity>
          ),
          keyExtractor: (item) => item.code,
        }}
      />
    </>
  );
};

export default PhoneScreen;

/*
      <PhoneInput
          ref={phoneInput}
          value={value}
          autoFocus
          defaultCode="US"
          layout="second"
          onChangeText={(text) => {
            setValue(text);
            console.log("unformatted: ", text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
            setCountryCode(phoneInput.current?.getCountryCode() || "");
            console.log("format: ", text);
            try {
              const isValid = parsePhoneNumberWithError(text).isPossible();
              if (isValid !== valid) {
                setValid(isValid);
              }
            } catch (error) {}
          }}
          countryPickerProps={{
            withFlag: false,
            withCountryNameButton: false,
            withFlagButton: false,
          }}
          textInputProps={{
            maxLength: countryCode === "US" ? 10 : 16,
          }}
        />
*/

/*
<FlatList
          data={countries}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.code}
        />
*/
