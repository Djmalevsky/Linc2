import React, { useState, useContext } from "react";
import { Context } from "../../../../context/authContext";
import { Text, View } from "react-native";
import styles from "./styles";
import { firebase, auth } from "../../../../config/firebaseConfig";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  Container,
  ContentContainer,
  GradientButton,
  Header,
} from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";

const CodeInputScreen = ({ route, navigation }) => {
  const { login, state } = useContext(Context);
  const recaptchaVerifier = state.recaptcha;
  const { verificationId, phoneNum, phoneProvider } = route.params;

  // value is the verification code entered
  const [id, setId] = useState(verificationId);
  const [value, setValue] = useState("");
  const [confirmError, setConfirmError] = useState();
  // know if loading or not
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onContinuePress = async () => {
    try {
      setConfirmError(undefined);
      setConfirmInProgress(true);

      const credential = firebase.auth.PhoneAuthProvider.credential(id, value);
      let currUser = await auth.currentUser;
      // created account through other method first
      if (currUser) {
        currUser = await currUser.linkWithCredential(credential);
        finishAccountCreation();
      } else {
        const authResult = await auth.signInWithCredential(credential);
        // not a new user, log them in
        if (!authResult.additionalUserInfo.isNewUser) {
          login(authResult.user.uid);
          return;
        } else {
          finishAccountCreation();
        }
      }
    } catch (err) {
      setValue("");
      setConfirmError(err);
      setConfirmInProgress(false);
    }
  };

  const finishAccountCreation = () => {
    setConfirmInProgress(false);
    setValue("");
    navigation.navigate("Name");
  };

  const onResendCodePress = async () => {
    const newId = await phoneProvider.verifyPhoneNumber(
      phoneNum,
      recaptchaVerifier.current
    );
    setId(newId);
  };

  return (
    <Container usingKeyboardIOS>
      <Header header="My code is" />
      <ContentContainer>
        <CodeField
          autoFocus
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>{symbol}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.resendContainer}
          onPress={onResendCodePress}
        >
          <Text style={styles.resendText}>Resend code</Text>
        </TouchableOpacity>
      </ContentContainer>
      <GradientButton
        callback={onContinuePress}
        buttonTitle="Continue"
        isDisabled={value.length < 6}
      />
    </Container>
  );
};

export default CodeInputScreen;

// {confirmError && <Text>{`Error: ${confirmError.message}`}</Text>}
